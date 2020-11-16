const jwt = require('jsonwebtoken');
const dbClient = require('../config/dbClient');
const { db } = require('../config/database');
const { hash, compare } = require('../utils/passwordHashing');
const { v4: uuidv4 } = require('uuid');
const uniqid = require('uniqid');

module.exports = {
    /**
     * @desc Registers a new user account
     * @route GET /auth/register
     * @returns success
     */
    registerUser: async (req, res) => {
        try {
            const userExists = await dbClient.getUserByQuery(db(), {
                email: req.body.email,
            });
            if (userExists !== undefined) {
                return res.status(400).json({
                    success: false,
                    error: { email: 'Email is already taken' },
                });
            }

            const password = hash(req.body.password, {
                salt: req.body.salt,
            });

            const newUser = {
                _id: uniqid(),
                guid: uuidv4(),
                isActive: false,
                balance: '$0.00',
                picture: 'http://placehold.it/215x215',
                address: req.body.address ? req.body.address : '',
                age: req.body.age ? req.body.age : 0,
                company: req.body.company ? req.body.company : '',
                eyeColor: req.body.eyeColor ? req.body.eyeColor : '',
                email: req.body.email,
                name: {
                    first: req.body.first,
                    last: req.body.last,
                },
                phone: req.body.phone ? req.body.phone : '',
                password: password.password,
                salt: password.salt,
            };
            const user = await dbClient.addUser(db(), newUser);
            return res.json({
                success: true,
                data: user,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: { server: 'Server Error' },
            });
        }
    },

    /**
     * @desc Retrieves user account if jwt is valid
     * @route GET /api/auth
     * @headers x-auth-token: (json web token)
     * @returns logged in user's profile
     */
    getAuthUser: async (req, res) => {
        try {
            const user = await dbClient.getUserByQuery(db(), {
                email: req.user.email,
            });
            if (user === undefined) {
                return res.status(404).json({
                    error: { email: 'Session has expired' },
                });
            }
            return res.json(user);
        } catch (errors) {
            console.error(errors);
            return res.status(500).json({ errors });
        }
    },

    /**
     * @desc Retrieves user account if jwt is valid
     * @route POST /api/auth
     * @body {username: String, password: String}
     * @returns user profile and new session token
     */
    loginUser: async (req, res) => {
        try {
            const user = await dbClient.getUserByQuery(db(), {
                email: req.body.email,
            });
            if (user !== undefined) {
                //console.log(payload);
                if (compare(req.body.password, user.password)) {
                    jwt.sign(
                        user,
                        process.env.SECRET_OR_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRES_IN,
                        },
                        (err, token) => {
                            return res.status(200).json({
                                user: user,
                                token: token,
                            });
                        }
                    );
                } else {
                    return res.status(401).json({
                        success: false,
                        error: { email: 'Invalid email or password' },
                    });
                }
            } else {
                return res.status(401).json({
                    success: false,
                    error: {
                        email: 'Invalid email or password',
                    },
                });
            }
        } catch (errors) {
            console.log(errors);
            return res.status(500).json({
                error: 'Server Error',
            });
        }
    },

    /**
     * @desc Resets user's password
     * @route POST /api/auth/reset
     * @body {username: String, password: String}
     * @returns success bool
     */
    resetPassword: async (req, res) => {
        try {
            const errors = {};
            console.log(req.user);
            const user = await dbClient.getUserByQuery(db(), {
                guid: req.user.guid,
            });
            console.log(user);
            if (req.body.password.length < 6) {
                errors.password = 'Password needs to be at least 6 characters';
            }
            if (req.body.password !== req.body.password2) {
                errors.password = 'Password do not match';
            }

            //console.log(req.body.current, user.password);
            if (!compare(req.body.current, user.password)) {
                errors.current = 'Invalid password';
            }

            if (Object.keys(errors).length > 0) {
                console.log(errors);
                return res.status(401).json({
                    success: false,
                    errors,
                });
            }

            const newPassword = hash(req.body.password, {
                salt: user.salt,
            });

            await dbClient.updateSingleEntry(db(), { guid: user.guid }, { password: newPassword.password });
            return res.json({ success: true });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                error,
            });
        }
    },
};
