// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // To use environment variables from .env file

// Import routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON payloads
app.use(express.json());
// Parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (resumes)
// This makes the 'uploads' directory public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
const connectDB = require('./db');
connectDB();

// --- API Routes ---
// Mount the routes with a base path
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/dashboard', dashboardRoutes);

// --- Root Route ---
app.get('/', (req, res) => {
  res.send('Job Board API is running...');
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});