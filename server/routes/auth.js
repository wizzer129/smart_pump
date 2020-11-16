const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateResults = require('../middleware/validateResults');
const { check } = require('express-validator');
const { getAuthUser, loginUser, registerUser, resetPassword } = require('../controllers/auth');

/**
 * @route /api/auth
 * @desc
 *  - GET returns a user profile if jsonwebtoken is valid.
 *  - POST Logs user in. If this is user's first time login, it will
 *      create a User account for them.
 *      Returns {Object} user, {String} token, {Bool} success
 */

router
    .route('/')
    .get([authMiddleware], getAuthUser)
    .post(
        [
            check('email', 'Please include a valid email').exists().trim().escape(),
            check('password', 'Please include a valid password').exists().trim().escape(),
            validateResults,
        ],
        loginUser
    );

/**
 * @route /api/auth/register
 * @desc
 *  - POST Creates a new profile for a user
 */
router
    .route('/register')
    .post(
        [
            check('email', 'Please include a valid email').exists().trim().escape(),
            check('first', 'Please include a valid first name').exists().trim().escape(),
            check('last', 'Please include a valid last name').exists().trim().escape(),
            check('password', 'Please include a valid password').exists().trim().escape(),
            validateResults,
        ],
        registerUser
    );

router.route('/reset').post([authMiddleware], resetPassword);

module.exports = router;
