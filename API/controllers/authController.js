const jwt = require('jsonwebtoken');
const { User } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');
const APIError = require('../helpers/apiError');

require('dotenv').config({ path: '../config.env' });

module.exports = {
  login: asyncCatch(async (req, res, next) => {
    if (!req.body.email || !req.body.password)
      return next(
        new APIError('Email or password field cannot be empty!', 401)
      );
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return next(new APIError('Incorrect password or email!', 401));
    }
    const isCorrectPassword = await User.checkPassword(user, req.body.password);
    if (!isCorrectPassword) {
      return next(new APIError('Incorrect password or email!', 401));
    }
    const token = await jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({
      status: 'Success',
      token,
      user,
    });
  }),
  signup: asyncCatch(async (req, res) => {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = await jwt.sign(
      { userId: newUser.userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.status(200).json({
      status: 'Success',
      token,
      user: newUser,
    });
  }),
  authenticateUser: asyncCatch(async (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) return next(new APIError('User not logged in!', 401));

    const token = tokenHeader.split(' ')[1];

    const loggedInUserId = await jwt.verify(token, process.env.JWT_SECRET);
    const loggedInUser = await User.findByPk(loggedInUserId.userId);

    req.user = loggedInUser;

    next();
  }),
  isAuthorized: (...roles) => {
    return async (req, res, next) => {
      console.log(req.user.role);
      try {
        if (req.user && roles.includes(req.user.role)) next();

        next(new APIError('Unauthorized user!', 403));
      } catch (err) {
        res.status(403).json({
          status: 'Failed',
          error: err.message,
        });
      }
    };
  },
};
