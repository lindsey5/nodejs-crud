const express = require('express');
const authController = require('../controller/authController')
const router = express.Router();
const {isLoggedIn} = require('../middleware/authMiddleware')

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', isLoggedIn, authController.login_get);
router.post('/login', authController.login_post);

module.exports = router;