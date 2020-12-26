const modelQuery = require('../helpers/queryRoute');
const asyncCatch = require('../helpers/asyncCatch');
const { User, Location, Favorite } = require('../models');

module.exports = {
  getUsers: asyncCatch(async (req, res) => {
    const queryObj = { ...req.query };
    console.log(queryObj);

    const query = modelQuery.fullQuery(queryObj);
    const users = await User.findAll(query);

    res.status(200).json({
      status: 'Success',
      users,
    });
  }),
  createUser: asyncCatch(async (req, res, next) => {
    const body = req.body;
    if (body.password !== body.passwordConfirm)
      return next(
        new Error('Password confirmation must be same with password!')
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

    res.status(200).json({
      status: 'Success',
      user,
    });
  }),
  getUser: asyncCatch(async (req, res) => {
    const user = await User.findByPk(req.params.id);
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
    res.status(200).json({
      status: 'Success',
      user: deletedUser,
    });
  }),
  getUserFavorites: asyncCatch(async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const favorites = await user.getLocations();
    res.status(200).json({
      status: 'Success',
      favorites,
    });
  }),
  addUserFavorite: asyncCatch(async (req, res) => {
    //const user = await User.findByPk(req.params.id);
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
