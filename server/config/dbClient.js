module.exports = {
    addUser: async (db, post) => {
        const res = await db.get('users').push(post).write();
        return res;
    },

    getUsers: async (db, filter, numberToGet = 10) => {
        return await db.get('users').filter(filter).sortBy({ name: 'first' }).take(numberToGet).value();
    },

    getUserById: async (db, id) => {
        return await db.get('users').find({ _id: id }).value();
    },

    getUserByQuery: async (db, query) => {
        try {
            const val = await db.get('users').find(query).value();
            return val;
        } catch (error) {
            return null;
        }
    },

    addUser: async (db, user) => {
        await db.get('users').push(user).write();
        return await db.get('users').find({ email: user.email }).value();
    },

    updateUser: async (db, user) => {
        try {
            await db.get('users').find({ _id: user._id }).assign(user).value();
            await db.write();
            const res = await db.get('users').find({ _id: user._id }).value();

            return res;
        } catch {
            return null;
        }
    },

    updateSingleEntry: async (db, query, field) => {
        await db.get('users').find(query).assign(field).value();
        await db.write();
        return;
    },
};
