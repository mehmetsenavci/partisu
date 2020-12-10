const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const authController = require('../controllers/auth');

// router.use(authController.authenticateUser);
router.route('/users')
                    .get(userController.getUsers)
                    .post(userController.createUser);

// router.use(authController.isAuthorized('admin'));
router.route('/users/:id')
                    .get(userController.getUser)
                    .patch(userController.updateUser)
                    .delete(userController.deleteUser);

module.exports = router;