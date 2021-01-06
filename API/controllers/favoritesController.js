const { Favorite, Location } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');
const APIError = require('../helpers/apiError');

module.exports = {
  getFavorites: asyncCatch(async (req, res, next) => {
    const favorites = await Favorite.findAll({ include: Location });

    if (favorites.length === 0) {
      return next(new APIError('Cannot find any favorites', 404));
    }

    res.status(200).json({
      status: 'Success',
      favorites,
    });
  }),
  createFavorite: asyncCatch(async (req, res) => {
    const newFavorite = await Favorite.create({
      userId: req.body.userId,
      locationId: req.body.locationId,
    });
    res.status(201).json({
      status: 'Success',
      newFavorite,
    });
  }),
  getFavorite: asyncCatch(async (req, res, next) => {
    const favorite = await Favorite.findByPk(req.params.id);

    if (favorite === null) {
      return next(new APIError('Such favorite does not exist.', 404));
    }

    res.status(200).json({
      status: 'Success',
      favorite,
    });
  }),
  deleteFavorite: asyncCatch(async (req, res) => {
    const deletedFavorite = await Favorite.destroy({
      where: { favoriteId: req.params.id },
    });
    res.status(204).json({
      status: 'Success',
      user: deletedFavorite,
    });
  }),
};
