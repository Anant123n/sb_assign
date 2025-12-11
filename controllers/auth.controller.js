const bcrypt2 = require('bcrypt');
const jwt2 = require('jsonwebtoken');
const User = require('../models/user.model');
const Organization = require('../models/organization.model');
const AuditC = require('./audit.controller');
const { jwtSecret, jwtExpiresIn } = require('../config');

async function signToken(user) {
    const payload = { userId: user._id, role: user.role, organizationId: user.organization.toString() };
    return jwt2.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}




exports.register = async (req, res) => {
    try {
        const { email, password, organization } = req.body;


        if (!email || !password || !organization) return res.status(400).json({ message: 'Missing fields' });


        let org = null;

        if (organization.match && organization.match(/^[0-9a-fA-F]{24}$/)) {
            org = await Organization.findById(organization);
        } else {

            org = await Organization.findOne({ name: organization });
            if (!org) org = await Organization.create({ name: organization });
        }


        const exists = await User.findOne({ email, organization: org._id });
        if (exists) return res.status(409).json({ message: 'User already exists in organization' });


        const hashed = await bcrypt2.hash(password, 12);
        const user = await User.create({ email, password: hashed, organization: org._id, role: 'user' });

        AuditC.logEvent({ type: 'register', success: true, userId: user._id, organizationId: org._id, meta: { email } });

        res.status(201).json({ id: user._id, email: user.email, role: user.role });
    } catch (err) {

        console.error(err);

        AuditC.logEvent({ type: 'register', success: false, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};












exports.login = async (req, res) => {
    try {

        const { email, password, organization } = req.body;

        if (!email || !password || !organization) return res.status(400).json({ message: 'Missing fields' });



        let org = null;
        if (organization.match && organization.match(/^[0-9a-fA-F]{24}$/)) {
            org = await Organization.findById(organization);
        } else {
            org = await Organization.findOne({ name: organization });
        }


        if (!org) return res.status(401).json({ message: 'Invalid credentials' });



        const user = await User.findOne({ email, organization: org._id });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });


        const ok = await bcrypt2.compare(password, user.password);

        if (!ok) {
            AuditC.logEvent({ type: 'login', success: false, userId: user._id, organizationId: org._id });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await signToken(user);

        AuditC.logEvent({ type: 'login', success: true, userId: user._id, organizationId: org._id });
        res.json({ token, user: { id: user._id, email: user.email, role: user.role, organizationId: org._id } });


    } catch (err) {


        console.error(err);
        AuditC.logEvent({ type: 'login', success: false, meta: { error: err.message } });
        res.status(500).json({ message: 'Server error' });
    }
};
