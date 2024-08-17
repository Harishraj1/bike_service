const express = require('express');
const router = express.Router();
const { getAllServices } = require('../controllers/servicesController');

router.get('/services', getAllServices);

module.exports = router;
