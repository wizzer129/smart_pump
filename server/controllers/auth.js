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
        const userExists = await dbClient.getUsers(db(), { email: req.body.email });
        if (userExists.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Email is already taken',
            });
        }

        const password = hash(req.body.password, { salt: req.body.salt });
        try {
            const newUser = {
                _id: uniqid(),
                guid: uuidv4(),
                isActive: true,
                balance: '$0.00',
                picture: 'http://placehold.it/32x32',
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
            return res.json({ success: true, data: user });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: 'Server Error',
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
            const user = await dbClient.getUsers(db(), { _id: req.user._id });
            if (user.length === 0) {
                res.status(404).json({
                    error: 'User not found',
                });
            }
            res.json(user);
        } catch (errors) {
            console.error(errors.message);
            res.status(500).send('Server Error');
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await dbClient.getUsers(db(), { email: req.body.email });
            if (user.length === 1) {
                //console.log(payload);
                const payload = user[0];
                //console.log(payload, req.body.password);
                if (compare(req.body.password, payload.password)) {
                    jwt.sign(payload, 'SECRETORKEY', (err, token) => {
                        return res.json({
                            user: payload,
                            token,
                        });
                    });
                } else {
                    return res.status(401).json({
                        error: 'invalid password',
                    });
                }
            } else {
                return res.status(404).json({
                    error: 'Email is not tied to an account',
                });
            }
        } catch (errors) {
            console.error(errors);
            return res.status(500).json({
                error: 'Server Error',
            });
        }
    },
};
