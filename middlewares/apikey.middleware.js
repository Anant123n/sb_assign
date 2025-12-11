const ApiKey = require('../models/apikey.model');
const bcrypt = require('bcrypt');
const AuditM = require('../models/audit.model');

exports.authenticateApiKey = async (req, res, next) => {
    const key = req.headers['x-api-key'] || req.query.api_key;
    if (!key) return res.status(401).json({ message: 'API key required' });
    try {
        const candidates = await ApiKey.find({ revoked: false });
        for (let c of candidates) {
            const ok = await bcrypt.compare(key, c.keyHash);
            if (ok) {
                req.apiKey = { id: c._id, organizationId: c.organization, createdBy: c.createdBy };
                AuditM.create({ type: 'apikey.use', success: true, organizationId: c.organization, meta: { apiKeyId: c._id } }).catch(() => { });
                return next();
            }
        }
        AuditM.create({ type: 'apikey.use', success: false, meta: { reason: 'no-match' } }).catch(() => { });
        return res.status(401).json({ message: 'Invalid API key' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
