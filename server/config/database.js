const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Memory = require('lowdb/adapters/Memory');

module.exports.db = () => {
    const adapter = new FileSync('./data/db.json');
    const db = low(adapter);
    db.read();
    db.defaults({ users: [] }).write();
    return db;
};
