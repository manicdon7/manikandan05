const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const timelineRoutes = require('./routes/timelineRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://manikandan05.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
const dburi = process.env.dbURI;
mongoose.connect(dburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: "Manikandan's Portfolio API is running!",
    version: "2.0.0",
    endpoints: {
      auth: "/api/auth",
      projects: "/api/projects", 
      certificates: "/api/certificates",
      testimonials: "/api/testimonials",
      timeline: "/api/timeline"
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/timeline', timelineRoutes);

// Legacy routes for backward compatibility
app.post('/api/register', (req, res) => {
  res.redirect(307, '/api/auth/register');
});

app.post('/api/login', (req, res) => {
  res.redirect(307, '/api/auth/login');
});

app.post('/api/upload', (req, res) => {
  res.redirect(307, '/api/projects');
});

app.post('/api/uploadCertificate', (req, res) => {
  res.redirect(307, '/api/certificates');
});

app.post('/api/uploadtestimonials', (req, res) => {
  res.redirect(307, '/api/testimonials');
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    availableRoutes: [
      'GET /',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/projects',
      'POST /api/projects',
      'GET /api/certificates',
      'POST /api/certificates',
      'GET /api/testimonials',
      'POST /api/testimonials',
      'GET /api/timeline',
      'POST /api/timeline'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server Error:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Base URL: http://localhost:${port}`);
});

module.exports = app;