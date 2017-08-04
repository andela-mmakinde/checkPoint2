import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import documents from './routes/document';
import users from './routes/user';
import roles from './routes/role';

require('dotenv').config();

// express app setUp
const app = express();

// log requests to console
app.use(logger('dev'));

// parse incoming requests
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

documents(app);
users(app);
roles(app);

module.exports = app;
