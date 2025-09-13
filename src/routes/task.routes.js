import express from 'express';
import auth from '../middleware/auth.js';
// import { authorizeRole } from '../middleware/authorizeRole.js';
import * as tasks from '../controllers/task.controller.js';

const router = express.Router();

// ---------------- Apply auth middleware to all task routes ----------------
router.use(auth);

// ---------------- Task CRUD Routes ----------------
router.post('/', tasks.createTask);          // Create task
router.get('/', tasks.getTasks);             // Get list of tasks
router.get('/:id', tasks.getTaskById);      // Get single task by ID
router.patch('/:id', tasks.updateTask);     // Update task
router.delete('/:id', tasks.deleteTask);    // Delete task (owner or admin)

// Export router
export default router;
