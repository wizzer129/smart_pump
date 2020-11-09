const jwt = require('jsonwebtoken');

// Middleware for converting a jsonwebtoken to json, jsonwebtoken should convert to an existing user
module.exports = async function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    if (!token) {
        return res
            .status(401)
            .json({ success: false, errors: [{ msg: 'No token, authorization denied', val: token, param: 'token' }] });
    }
    // Verify token
    try {
        await jwt.verify(token, process.env.SECRET_OR_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    success: false,
                    errors: [{ msg: 'Token is not valid', error, val: token, param: 'token' }],
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            errors: [{ msg: 'Auth Server Error', error: err, param: 'auth middleware' }],
        });
    }
};
