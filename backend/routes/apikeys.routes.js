const express = require('express');
const apikeys = express.Router();
const apikeyC = require('../controllers/apikey.controller');
const { authenticateJWT } = require('../middlewares/auth.middleware');

apikeys.use(authenticateJWT);




apikeys.get('/', apikeyC.listKeys);
apikeys.post('/', apikeyC.generateKey);
apikeys.post('/rotate/:id', apikeyC.rotateKey);
apikeys.post('/revoke/:id', apikeyC.revokeKey);

module.exports = apikeys;
