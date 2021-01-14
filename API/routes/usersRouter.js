const express = require('express');

const router = express.Router();
const userController = require('../controllers/usersController');
const cacheHelpers = require('../helpers/cacheRedis');
// const authController = require('../controllers/authController');

// router.use(authController.authenticateUser);
router
  .route('/users')
  .get(cacheHelpers.getDataFromCache, userController.getUsers)
  .post(userController.createUser);

// router.use(authController.isAuthorized('admin'));
router
  .route('/users/:id')
  .get(cacheHelpers.getDataFromCache, userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/users/:id/favorites')
  .get(cacheHelpers.getDataFromCache, userController.getUserFavorites)
  .post(userController.addUserFavorite);

router
  .route('/users/:id/favorites/:favId')
  .get(cacheHelpers.getDataFromCache, userController.getUserFavorite)
  .delete(userController.deleteUserFavorite);

module.exports = router;
