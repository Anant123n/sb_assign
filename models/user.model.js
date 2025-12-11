const mongoose2 = require('mongoose');


const UserSchema = new mongoose2.Schema({

    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'manager', 'admin'], default: 'user' },
    organization: { type: mongoose2.Schema.Types.ObjectId, ref: 'Organization', required: true },
    createdAt: { type: Date, default: Date.now },


});


UserSchema.index({ email: 1, organization: 1 }, { unique: true });





module.exports = mongoose2.model('User', UserSchema);
