const express = require('express');
const router = express.Router();
const { bookService, getMyServices } = require('../controllers/serviceRequestController');

router.post('/bookservice', bookService);
router.get('/myservices', getMyServices);

module.exports = router;
