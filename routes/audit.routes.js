const express9 = require('express');
const auditR = express9.Router();
const auditC = require('../controllers/audit.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');
const { allowRoles: allow } = require('../middlewares/rbac.middleware');

auditR.use(authenticateJWT);
auditR.get('/', allow(['admin']), auditC.queryLogs);

module.exports = auditR;
