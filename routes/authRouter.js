

const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { validateSignup, validateLogin, validationResults } = require('../middleware/validationMiddleware');



router.post('/signup', validateSignup, validationResults, signup);
router.post('/login', validateLogin, validationResults, login);

module.exports = router;
