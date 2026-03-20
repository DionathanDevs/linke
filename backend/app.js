const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler');
const viewsRoutes = require('./routes/viewsRoutes');

const app = express();

// Security middlewares
app.use(helmet());
app.use(helmet.hidePoweredBy()); // Explicitly hide X-Powered-By

// CORS Configuration - Strict for production
const allowedOrigin = process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL
    : ['http://localhost:5173', 'http://localhost:5000'];

const corsOptions = {
    origin: allowedOrigin,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parsing JSON bodies
app.use(express.json());

// API Routes
app.use('/api/views', viewsRoutes);

// Serve Static React Build 
// Render unified deploy - the frontend/dist folder will be available after build
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

// Catch-all route to serve React app for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
