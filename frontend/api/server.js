const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const flashcardRoutes = require('./routes/flashcards');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flashcards', flashcardRoutes);

// Serverless function
module.exports = app;
