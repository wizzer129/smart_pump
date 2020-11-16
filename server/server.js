const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

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

const PORT = process.env.NODE_ENV !== 'dev' ? process.env.PORT : 5000;

if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('../client/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(path.join(__dirname, '../'), 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    app.emit('app_started');
});

module.exports = app;