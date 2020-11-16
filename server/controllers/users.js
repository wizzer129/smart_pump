const dbClient = require('../config/dbClient');
const { db } = require('../config/database');
const jwt = require('jsonwebtoken');
module.exports = {
    /**
     * @route GET /api/users/:id
     * @param {*} req
     * @param {*} res
     */
    getUser: async (req, res) => {
        try {
            const user = await dbClient.getUsers(db(), { _id: req.params.id }, 10);
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
     * @route GET /api/users
     * @param {*} req
     * @param {*} res
     * @desc retrieves 10 users
     */
    getUsers: async (req, res) => {
        try {
            //console.log(db);
            const users = await dbClient.getUsers(db(), {}, 10);
            return res.json({ success: true, data: users });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                msg: err,
                success: false,
                error: 'Server Error',
            });
        }
    },

    /**
     * @route POST /api/users
     * @param {*} req
     * @param {*} res
     * @desc allows user to edit their own profile
     */
    updateUser: async (req, res) => {
        try {
            // get user's original profile
            const oldUserData = await dbClient.getUserByQuery(db(), { guid: req.body.guid });
            if (req.body.email !== oldUserData.email) {
                const checkIfEmailExists = await dbClient.getUsers(db(), { email: req.body.email });
                console.log(checkIfEmailExists);
                if (checkIfEmailExists.length > 1)
                    return res.status(400).json({ success: false, error: { email: 'Email is already taken' } });
            }
            const updatedUserData = {
                ...oldUserData,
                age: req.body.age,
                address: req.body.address,
                company: req.body.company,
                email: req.body.email,
                eyeColor: req.body.eyeColor,
                name: {
                    first: req.body.first ? req.body.first : req.user.name.first,
                    last: req.body.last ? req.body.last : req.user.name.last,
                },
                phone: req.body.phone,
            };
            //console.log(updatedUserData);
            const payload = await dbClient.updateUser(db(), updatedUserData);
            console.log('payload', payload);
            // update auth token with new user data
            return res.json({
                success: true,
                data: payload,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                error: { email: 'Server Error' },
            });
        }
    },
};
