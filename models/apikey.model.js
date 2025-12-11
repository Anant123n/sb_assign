const mongoose4 = require('mongoose');


const ApiKeySchema = new mongoose4.Schema({

    keyHash: { type: String, required: true },
    label: { type: String },

    organization: { type: mongoose4.Schema.Types.ObjectId, ref: 'Organization', required: true },
    createdBy: { type: mongoose4.Schema.Types.ObjectId, ref: 'User' },
    revoked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },




});






module.exports = mongoose4.model('ApiKey', ApiKeySchema);
