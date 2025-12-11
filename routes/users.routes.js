const express = require('express');
const users = express.Router();
const userC = require('../controllers/user.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/rbac.middleware');

users.use(authenticateJWT);

users.get('/', allowRoles(['admin', 'manager']), userC.listUsers);
users.get('/:id', userC.getUser);
users.post('/', allowRoles(['admin']), userC.createUser);
users.put('/:id', allowRoles(['admin', 'manager']), userC.updateUser);
users.delete('/:id', allowRoles(['admin']), userC.deleteUser);

module.exports = users;
