const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateResults = require('../middleware/validateResults');
const { check } = require('express-validator');
const { getUsers, getUser, updateUser } = require('../controllers/users');

/**
 * @route /api/users
 *  - GET returns all users, if user is logged in
 *  - POST Endpoint for a user to update their own profile
 */

router
    .route('/')
    .get([], getUsers)
    .post(
        [authMiddleware, check('email', 'Please include a valid email').exists().isEmail(), validateResults],
        updateUser
    );

/**
 * @route /api/users
 */
router
    .route('/:id')
    .get([authMiddleware, check('id', 'Please include a valid user ID').exists(), validateResults], getUser);

module.exports = router;
