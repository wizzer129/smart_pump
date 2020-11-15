module.exports = {
    addUser: async (db, post) => {
        const res = await db.get('users').push(post).write();
        return res;
    },

    getUsers: async (db, filter, numberToGet = 10) => {
        return await db.get('users').filter(filter).sortBy({ name: 'first' }).take(numberToGet).value();
    },

    addUser: async (db, user) => {
        return await db.get('users').push(user).write();
    },

    updateUser: async (db, user) => {
        await db.get('users').find({ _id: user._id }).assign(user).value();
        await db.write();
        const res = await db.get('users').find({ _id: user._id }).value();

        return res;
    },
};
