const { User, Favorite, Location } = require('../models');

module.exports = {
  getFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.findAll();
      res.status(200).json({
        status: 'Success',
        favorites,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  createFavorite: async (req, res) => {
    try {
      const newFavorite = await Favorite.create({
        userId: req.body.userId,
        locationId: req.body.locationId,
      });
      res.status(200).json({
        status: 'Success',
        newFavorite,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  getFavorite: async (req, res) => {
    try {
      const favorite = await Favorite.findByPk(req.params.id);
      res.status(200).json({
        status: 'Success',
        favorite,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      const deletedFavorite = await Favorite.destroy({
        where: { favoriteId: req.params.id },
      });
      res.status(200).json({
        status: 'Success',
        user: deletedFavorite,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
};
