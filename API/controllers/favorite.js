const { User, Favorite, Location } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');

module.exports = {
  getFavorites: asyncCatch(async (req, res) => {
    const favorites = await Favorite.findAll();
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
    res.status(200).json({
      status: 'Success',
      newFavorite,
    });
  }),
  getFavorite: asyncCatch(async (req, res) => {
    const favorite = await Favorite.findByPk(req.params.id);
    res.status(200).json({
      status: 'Success',
      favorite,
    });
  }),
  deleteFavorite: asyncCatch(async (req, res) => {
    const deletedFavorite = await Favorite.destroy({
      where: { favoriteId: req.params.id },
    });
    res.status(200).json({
      status: 'Success',
      user: deletedFavorite,
    });
  }),
};
