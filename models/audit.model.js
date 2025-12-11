const mongoose5 = require('mongoose');


const AuditSchema = new mongoose5.Schema({

    type: { type: String, required: true },
    success: { type: Boolean, default: true },
    userId: { type: mongoose5.Schema.Types.ObjectId, ref: 'User', default: null },

    organizationId: { type: mongoose5.Schema.Types.ObjectId, ref: 'Organization', default: null },
    meta: { type: Object, default: {} },
    timestamp: { type: Date, default: Date.now },
});



module.exports = mongoose5.model('Audit', AuditSchema);
