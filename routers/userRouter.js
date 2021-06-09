
const express = require('express');

const UserController = require('../controllers/usersController');

const router = express.Router();


router.post('/register-user', UserController.registerUser);
router.post('/login', UserController.userLogin);


module.exports = router;