const express = require('express');

const app = express();

// REST api integration
const auth = require('./routes/auth');
const users = require('./routes/users');

// configure to read json request
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', auth);
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    app.emit('app_started');
});

module.exports = app;