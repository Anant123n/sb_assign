const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongodb');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');

const apiKeyRoutes = require('./routes/apikeys.routes');
const auditRoutes = require('./routes/audit.routes');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.use('/api/apikeys', apiKeyRoutes);
app.use('/api/audit', auditRoutes);

app.get('/', (req, res) => res.send('Multi-tenant auth API'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
