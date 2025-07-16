const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const submissionRoutes = require('./routes/submissionRoutes'); // ✅ import routes

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/internship_db')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Use routes
app.use('/api', submissionRoutes);  // all routes start with /api

// ✅ Start server
app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});
