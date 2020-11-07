const dbClient = require('../config/dbClient');
const { db } = require('../config/database');

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
     */
    updateUser: async (req, res) => {
        try {
            const user = await db
                .get('users')
                .push({ ...req.body })
                .write();
            return res.json({ success: true, data: user });
        } catch (err) {
            return res.status(500).json({
                success: false,
                error: 'Server Error',
            });
        }
    },
};
