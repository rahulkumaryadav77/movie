const express = require('express');
const router = express.Router();
const { signIn, getSignIn } = require('../controllers/login');

router.get('/login', getSignIn);
router.post('/login', signIn);

module.exports = router; 