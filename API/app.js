const express = require('express');
const app = express();
const helmet = require('helmet')

require('dotenv').config({ path: './config.env' });
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const locationRouter = require('./routes/location');

app.use(express.json());


// Middlewares
app.use(helmet());


// Routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', locationRouter);

module.exports = app;