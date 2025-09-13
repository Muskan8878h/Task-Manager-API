// src/controllers/task.controller.js

import Task from '../models/task.js';
import mongoose from 'mongoose';

// ---------------- Create Task ----------------
export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    next(err); // Pass error to central error handler
  }
};

// ---------------- Get Tasks ----------------
export const getTasks = async (req, res, next) => {
  try {
    // Admin gets all tasks, user gets only their own
    const filter = req.user.role === 'admin' ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter)
      .populate('owner', 'name email') // populate owner details
      .sort({ createdAt: -1 });       // latest first
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

// ---------------- Get Task by ID ----------------
export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only owner or admin can view
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

// ---------------- Update Task ----------------
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only owner or admin can update
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(task, req.body); // merge updates
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// ---------------- Delete Task ----------------
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Only owner or admin can delete
    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
