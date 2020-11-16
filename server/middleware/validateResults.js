const { validationResult } = require('express-validator');

// process validation results from api request to see if there are any errors
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
