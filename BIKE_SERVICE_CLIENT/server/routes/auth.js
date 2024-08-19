const express = require('express');
const router = express.Router();
const { login, addUser } = require('../controllers/authController');

router.post('/login', login);
router.post('/adduser', addUser);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 3a59e0c0cae3583a07327a9002acb48ba8dfe304
