const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/services'));
app.use('/', require('./routes/serviceRequest'));

module.exports = app;
