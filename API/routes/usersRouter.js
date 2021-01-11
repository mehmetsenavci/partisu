const express = require('express');

const router = express.Router();
const userController = require('../controllers/usersController');
// const authController = require('../controllers/auth');

// router.use(authController.authenticateUser);
router
  .route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);

// router.use(authController.isAuthorized('admin'));
router
  .route('/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router
  .route('/users/:id/favorites')
  .get(userController.getUserFavorites)
  .post(userController.addUserFavorite);

router
  .route('/users/:id/favorites/:favId')
  .get(userController.getUserFavorite)
  .delete(userController.deleteUserFavorite);

module.exports = router;
