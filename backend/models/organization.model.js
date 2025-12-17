const mongoose = require('mongoose');




const OrganizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    metadata: { type: Object },
    createdAt: { type: Date, default: Date.now },
});




module.exports = mongoose.model('Organization', OrganizationSchema);
