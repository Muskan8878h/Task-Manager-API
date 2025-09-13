import 'dotenv/config';
import connectDB from '../config/db.js';
import User from '../models/user.js';

async function seed() {
  // Connect to MongoDB
  await connectDB(process.env.MONGO_URI);

  const adminEmail = 'admin@example.com';

  // Check if admin already exists
  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  // Create new admin user
  const admin = new User({
    name: 'Admin',
    email: adminEmail,
    password: 'Admin123!', // Password will be hashed automatically
    role: 'admin'
  });

  await admin.save();
  console.log('Admin created:', adminEmail);
  process.exit(0);
}

// Run seeder
seed().catch(err => {
  console.error(err);
  process.exit(1);
});
