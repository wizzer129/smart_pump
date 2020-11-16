const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// load environment variables
const envFile = '.env.secrets';

dotenv.config({
    path: `./config/${envFile}`,
});

const app = express();

// configure to read json request

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

// REST api integration
const auth = require('./routes/auth');
const users = require('./routes/users');

app.use('/api/auth', auth);
app.use('/api/users', users);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    app.emit('app_started');
});

module.exports = app;
