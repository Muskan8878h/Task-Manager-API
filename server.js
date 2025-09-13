// Load environment variables
import 'dotenv/config';

// Import modules
import connectDB from './src/config/db.js';
import app from './src/app.js';

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start the server
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  });
