const express = require('express');
const router = express.Router();
//const auth = require('../middleware/authMiddleware');
const validateResults = require('../middleware/validateResults');
const { check } = require('express-validator');
const { registerUser, getUsers, getUser, updateUser } = require('../controllers/users');

/**
 * @route /api/users
 *  - GET returns all users, if user is logged in
 *  - POST Registers a new user in the database
 *
 */

router.route('/').get([], getUsers);

/**
 * @route /api/users
 */
router
    .route('/:id')
    .get([check('id', 'Please include a valid user ID').exists(), validateResults], getUser)
    .post(
        [
            check('id', 'Please include a valid user ID').exists().trim().escape(),
            check('username', 'Please include a valid username').exists().trim().escape(),
            check('email', 'Please include a valid email').exists().trim().escape(),
            check('fullName', 'Please include a valid fullName').exists().trim().escape(),
            validateResults,
        ],
        updateUser
    );

module.exports = router;
