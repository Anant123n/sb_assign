exports.allowRoles = (roles = []) => (req, res, next) => {

    const role = req.user && req.user.role;

    if (!role) return res.status(401).json({ message: 'Unauthorized' });
    if (roles.includes(role)) return next();


    return res.status(403).json({ message: 'Forbidden' });
};
