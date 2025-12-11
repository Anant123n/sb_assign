const AuditModel = require('../models/audit.model');

exports.logEvent = async ({ type, success = true, userId = null, organizationId = null, meta = {} }) => {
    try {
        return await AuditModel.create({ type, success, userId, organizationId, meta });


    } catch (err) {


        console.error('Audit write failed', err);
        return null;
    }
};











exports.queryLogs = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const q = { organizationId: orgId };


        if (req.query.type) q.type = req.query.type;
        if (req.query.success) q.success = req.query.success === 'true';
        const logs = await AuditModel.find(q).sort({ timestamp: -1 }).limit(200);

        res.json(logs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
