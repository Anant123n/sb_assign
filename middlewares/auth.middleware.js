const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const Audit = require('../models/audit.model');

exports.authenticateJWT = (req, res, next) => {

    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });
    const token = auth.split(' ')[1];


    try {
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload; // { userId, role, organizationId }
        next();

    } catch (err) {

        Audit.create({ type: 'token.verify', success: false, meta: { error: err.message } }).catch(() => { });
        return res.status(401).json({ message: 'Invalid token' });


    }
};
