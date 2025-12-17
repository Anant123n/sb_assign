const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const AuditU = require('./audit.controller');




exports.listUsers = async (req, res) => {
    try {

        const orgId = req.user.organizationId;
        const users = await UserModel.find({ organization: orgId }).select('-password');
        res.json(users);
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};







exports.getUser = async (req, res) => {

    try {
        const orgId = req.user.organizationId;
        const user = await UserModel.findOne({ _id: req.params.id, organization: orgId }).select('-password');


        if (!user) return res.status(404).json({ message: 'Not found' });
        res.json(user);
    } catch (err) {

        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};







exports.createUser = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const { email, password, role = 'user' } = req.body;

        const exists = await UserModel.findOne({ email, organization: orgId });

        if (exists) return res.status(409).json({ message: 'User exists' });

        const hashed = await bcrypt.hash(password, 12);
        const user = await UserModel.create({ email, password: hashed, role, organization: orgId });


        AuditU.logEvent({ type: 'user.create', success: true, userId: req.user.userId, organizationId: orgId, meta: { createdUser: user._id } });
        res.status(201).json({ id: user._id, email: user.email, role: user.role });

    } catch (err) {

        console.error(err);
        AuditU.logEvent({ type: 'user.create', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};







exports.updateUser = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const updates = { ...req.body };


        if (updates.password) updates.password = await bcrypt.hash(updates.password, 12);

        const user = await UserModel.findOneAndUpdate({ _id: req.params.id, organization: orgId }, updates, { new: true }).select('-password');


        if (!user) return res.status(404).json({ message: 'Not found' });

        AuditU.logEvent({ type: 'user.update', success: true, userId: req.user.userId, organizationId: orgId, meta: { updatedUser: user._id } });
        res.json(user);

    } catch (err) {

        console.error(err);
        AuditU.logEvent({ type: 'user.update', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};






exports.deleteUser = async (req, res) => {
    try {
        const orgId = req.user.organizationId;
        const user = await UserModel.findOneAndDelete({ _id: req.params.id, organization: orgId });

        if (!user) return res.status(404).json({ message: 'Not found' });

        AuditU.logEvent({ type: 'user.delete', success: true, userId: req.user.userId, organizationId: orgId, meta: { deletedUser: user._id } });
        res.json({ message: 'Deleted' });
    } catch (err) {

        console.error(err);
        AuditU.logEvent({ type: 'user.delete', success: false, organizationId: req.user.organizationId, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};
