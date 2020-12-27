const express = require('express');
const app = express();
const helmet = require('helmet');

require('dotenv').config({ path: './config.env' });
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const locationRouter = require('./routes/location');
const favoriteRouter = require('./routes/favorite');
const partyRouter = require('./routes/party');

const errorController = require('./controllers/error');

app.use(express.json());

// Middlewares
app.use(helmet());

// Routes
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', locationRouter);
app.use('/api', favoriteRouter);
app.use('/api', partyRouter);
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'Failed',
    message: 'Page not found',
  });
});

app.use(errorController);

module.exports = app;
