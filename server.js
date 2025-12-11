const express10 = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const config = require('./config');




const authRoutes = require('./routes/auth.routes');
const apiKeyRoutes = require('./routes/apikeys.routes');
const auditRoutes = require('./routes/audit.routes');

connectDB();
const app = express10();


app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/apikeys', apiKeyRoutes);
app.use('/api/audit', auditRoutes);



app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
