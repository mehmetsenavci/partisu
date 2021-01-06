const express = require('express');
const helmet = require('helmet');

const app = express();

require('dotenv').config({ path: './config.env' });
const userRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const locationRouter = require('./routes/locationsRouter');
const favoriteRouter = require('./routes/favoritesRouter');
const partyRouter = require('./routes/partiesRouter');

const errorController = require('./controllers/errorController');

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
