const express = require('express');
const router = express.Router();
const { signUp, getSignup } = require('../controllers/register');

router.get('/register', getSignup);
router.post('/register', signUp);

module.exports = router; 