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
            console.log();
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
            const user = await dbClient.getUsers(db, { _id: req.user._id });
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
            const user = await db.find({ _id: req.user._id });
            res.json(user);
        } catch (errors) {
            console.error(errors.message);
            res.status(500).send('Server Error');
        }
    },
};

/** 
exports.loginUser = async (req, res, next) => {
    try {
        let payload = {};
        if (req.user) {
            let user = await User.findOne({ guid: req.user.guid }).exec();
            try {
                payload.permissionGroup = findPermissionGroup(ldapGroup.groups);
            } catch (error) {
                res.status(500).json({ msg: 'issue getting user groups', errors });
            }
            // check if user exists
            
            // create jsonwebtoken
            jwt.sign(payload, process.env.SECRET_OR_KEY, (err, token) => {
                return res.json({
                    success: true,
                    token,
                    user,
                    payload,
                });
            });
        } else {
            return res.status(500).json({
                errors: 'Server Error: Could not find user groups or profile in AD for user',
                msg: req.user,
            });if (user) {
                // if exists, update user profile
                payload._id = user._id;
                payload.username = ldapUser.sAMAccountName;
                payload.fullName = ldapUser.displayName;
                payload.email = ldapUser.mail ? ldapUser.mail : '';
                payload.objectGUID = ldapUser.objectGUID;
                payload.title = ldapUser.title ? ldapUser.title : '';
                user.username = ldapUser.sAMAccountName;
                user.fullName = ldapUser.displayName;
                user.email = ldapUser.mail ? ldapUser.mail : '';
                user.permissionGroup = payload.permissionGroup;
                user.title = ldapUser.title ? ldapUser.title : '';
                user.updatedAt = new Date();
                await user.save();
            } else {
                // if does not exists, create user profile
                const newUserConfig = {
                    username: ldapUser.sAMAccountName,
                    fullName: ldapUser.displayName,
                    permissionGroup: payload.permissionGroup,
                    email: ldapUser.mail ? ldapUser.mail : '',
                    title: ldapUser.title ? ldapUser.title : '',
                    objectGUID: ldapUser.objectGUID,
                };

                user = await User.create(newUserConfig);
                payload = { ...payload, ...newUserConfig, _id: user._id };
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err });
    }
};
*/
