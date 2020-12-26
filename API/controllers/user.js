const modelQuery = require('../helpers/queryRoute');
const { User, Location, Favorite } = require('../models');

module.exports = {
  getUsers: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      console.log(queryObj);

      // FIELDS
      const fields = modelQuery.fields(queryObj);

      // PAGINATON
      const { offset, limit } = modelQuery.pagination(queryObj);
      // FILTER
      const filter = modelQuery.filter(queryObj);

      // SORT
      const sort = modelQuery.sort(queryObj);

      const users = await User.findAll({
        where: filter,
        attributes: fields,
        limit: limit,
        offset: offset,
        order: sort,
      });

      res.status(200).json({
        status: 'Success',
        users,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
  createUser: async (req, res, next) => {
    try {
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
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).json({
        status: 'Success',
        user,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      const updatedUser = await user.update(req.body);
      res.status(200).json({
        status: 'Success',
        user: updatedUser,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await User.destroy({ where: { userId: userId } });
      res.status(200).json({
        status: 'Success',
        user: deletedUser,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err,
      });
    }
  },
  getUserFavorites: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      const favorites = await user.getLocations();
      res.status(200).json({
        status: 'Success',
        favorites,
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
  addUserFavorite: async (req, res) => {
    try {
      //const user = await User.findByPk(req.params.id);
      const newFavorite = await Favorite.create({
        userId: req.params.id,
        locationId: req.body.locationId,
      });
      res.status(200).json({
        status: 'Success',
        newFavorite,
      });
    } catch (err) {
      res.status(400).json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
};
