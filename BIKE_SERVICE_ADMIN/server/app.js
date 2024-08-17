const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/adminRoutes'));
app.use('/', require('./routes/serviceRoutes'));
app.use('/', require('./routes/userRoutes'));
app.use('/', require('./routes/serviceRequestRoutes'));

module.exports = app;
