const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
// load environment letiables
const envFile = '.env.secrets';
dotenv.config({
    path: `./config/${envFile}`,
});

const app = express();
/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Authorization, x-auth-token');
    next();
});

*/

// configure to read json request

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

// REST api integration
const auth = require('./routes/auth');
const test = require('./routes/test');
const users = require('./routes/users');

app.use('/api/auth', auth);
app.use('/api/test', test);
app.use('/api/users', users);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    app.emit('app_started');
});

module.exports = app;
