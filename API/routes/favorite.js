const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/favorite');

// No update route.
router
  .route('/favorites')
  .get(favoriteController.getFavorites)
  .post(favoriteController.createFavorite);

router
  .route('/favorites/:id')
  .get(favoriteController.getFavorite)
  .delete(favoriteController.deleteFavorite);

module.exports = router;
