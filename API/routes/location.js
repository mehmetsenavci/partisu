const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location');
// const authController = require('../controllers/auth');

// router.use(authController.authenticateUser);
router
  .route('/locations')
  .get(locationController.getLocations)
  .post(locationController.createLocation);

// router.use(authController.isAuthorized('admin'));
router
  .route('/locations/:id')
  .get(locationController.getLocation)
  .patch(locationController.updateLocation)
  .delete(locationController.deleteLocation);

module.exports = router;
