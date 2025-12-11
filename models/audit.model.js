const mongoose = require('mongoose');

const AuditSchema = new mongoose.Schema({
    type: { type: String, required: true },
    success: { type: Boolean, default: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null },
    meta: { type: Object, default: {} },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audit', AuditSchema);
