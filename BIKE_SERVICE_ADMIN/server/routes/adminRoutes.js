const express = require('express');
const { registerAdmin, getAdminDetails, loginAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/register-admin', registerAdmin);
router.get('/admin-details', getAdminDetails);
router.post('/login-admin', loginAdmin);

module.exports = router;
