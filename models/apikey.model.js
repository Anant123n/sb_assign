const mongoose = require('mongoose');



const ApiKeySchema = new mongoose.Schema({
    keyHash: { type: String, required: true },
    label: { type: String },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    revoked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});








module.exports = mongoose.model('ApiKey', ApiKeySchema);
