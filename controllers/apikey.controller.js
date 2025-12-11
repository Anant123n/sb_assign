const ApiKeyModel = require('../models/apikey.model');
const bcrypt4 = require('bcrypt');
const crypto = require('crypto');
const AuditK = require('./audit.controller');



exports.generateKey = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const plain = crypto.randomBytes(32).toString('hex');
        const hashed = await bcrypt4.hash(plain, 12);

        const doc = await ApiKeyModel.create({ organization: orgId, keyHash: hashed, createdBy: req.user.userId });

        AuditK.logEvent({ type: 'apikey.create', success: true, userId: req.user.userId, organizationId: orgId, meta: { apiKeyId: doc._id } });
        res.status(201).json({ apiKeyId: doc._id, apiKey: plain });
    } catch (err) {
        console.error(err);

        AuditK.logEvent({ type: 'apikey.create', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};





exports.rotateKey = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const id = req.params.id;

        const existing = await ApiKeyModel.findOne({ _id: id, organization: orgId });
        if (!existing) return res.status(404).json({ message: 'Not found' });

        existing.revoked = true;
        await existing.save();

        const plain = crypto.randomBytes(32).toString('hex');
        const hashed = await bcrypt4.hash(plain, 12);
        const doc = await ApiKeyModel.create({ organization: orgId, keyHash: hashed, createdBy: req.user.userId });


        AuditK.logEvent({ type: 'apikey.rotate', success: true, userId: req.user.userId, organizationId: orgId, meta: { oldKey: id, newKey: doc._id } });
        res.json({ apiKeyId: doc._id, apiKey: plain });

    } catch (err) {
        console.error(err);

        AuditK.logEvent({ type: 'apikey.rotate', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};




exports.revokeKey = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const id = req.params.id;


        const doc = await ApiKeyModel.findOneAndUpdate({ _id: id, organization: orgId }, { revoked: true }, { new: true });
        if (!doc) return res.status(404).json({ message: 'Not found' });

        AuditK.logEvent({ type: 'apikey.revoke', success: true, userId: req.user.userId, organizationId: orgId, meta: { apiKeyId: doc._id } });

        res.json({ message: 'Revoked' });

    } catch (err) {
        console.error(err);
        AuditK.logEvent({ type: 'apikey.revoke', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};
