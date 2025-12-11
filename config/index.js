require('dotenv').config();

module.exports = {
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || 'replace_this_in_prod',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/multitenant',
};
