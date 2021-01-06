const modelQuery = require('../helpers/queryRoute');
const asyncCatch = require('../helpers/asyncCatch');
const APIError = require('../helpers/apiError');
const { User, Location, Favorite } = require('../models');

module.exports = {
  getUsers: asyncCatch(async (req, res, next) => {
    const queryObj = { ...req.query };

    const query = modelQuery.fullQuery(queryObj);
    const users = await User.findAll(query);

    if (users.length === 0) {
      return next(new APIError('There are no users', 404));
    }

    res.status(200).json({
      status: 'Success',
      users,
    });
  }),
  createUser: asyncCatch(async (req, res, next) => {
    const { body } = req;
    if (body.password !== body.passwordConfirm)
      return next(
        new APIError('Password confirmation must be same with password!', 400)
      );
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      dob: body.dob,
      email: body.email,
      username: body.username,
      role: body.role,
      password: body.password,
      passwordConfirm: body.passwordConfirm,
    });

    res.status(201).json({
      status: 'Success',
      user,
    });
  }),
  getUser: asyncCatch(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user === null) {
      return next(new APIError('User not found', 404));
    }

    res.status(200).json({
      status: 'Success',
      user,
    });
  }),
  updateUser: asyncCatch(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const updatedUser = await user.update(req.body);

    res.status(200).json({
      status: 'Success',
      user: updatedUser,
    });
  }),
  deleteUser: asyncCatch(async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await User.destroy({ where: { userId: userId } });

    res.status(204).json({
      status: 'Success',
      user: deletedUser,
    });
  }),
  getUserFavorites: asyncCatch(async (req, res, next) => {
    const favorites = await Favorite.findAll({
      where: { userId: req.params.id },
      include: Location,
    });

    if (favorites.length === 0) {
      return next(
        new APIError('Given user does not have any favorite locations.', 404)
      );
    }

    // const favorites = await user.getLocations();
    res.status(200).json({
      status: 'Success',
      favorites,
    });
  }),
  addUserFavorite: asyncCatch(async (req, res) => {
    // const user = await User.findByPk(req.params.id);
    const newFavorite = await Favorite.create({
      userId: req.params.id,
      locationId: req.body.locationId,
    });
    res.status(200).json({
      status: 'Success',
      newFavorite,
    });
  }),
};
