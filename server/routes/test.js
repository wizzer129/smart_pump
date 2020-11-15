const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateResults = require('../middleware/validateResults');
const { check } = require('express-validator');
const { getAuthUser, registerUser, loginUser } = require('../controllers/auth');

router.route('/').get([authMiddleware], getAuthUser);

module.exports = router;
