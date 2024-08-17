const express = require('express');
const { getServiceRequests, updateServiceRequestStatus } = require('../controllers/serviceRequestController');
const router = express.Router();

router.get('/servicerequests', getServiceRequests);
router.put('/servicerequests/:id', updateServiceRequestStatus);

module.exports = router;
