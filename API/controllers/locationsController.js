const { Location } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');
const APIError = require('../helpers/apiError');

module.exports = {
  getLocations: asyncCatch(async (req, res, next) => {
    const locations = await Location.findAll();

    if (locations.length === 0) {
      return next(new APIError('Cannot find any locations.', 404));
    }

    res.status(200).json({
      status: 'Success',
      locations,
    });
  }),
  createLocation: asyncCatch(async (req, res) => {
    const { body } = req;
    const location = await Location.create({
      locationName: body.locationName,
      latitude: body.latitude,
      longitude: body.longitude,
    });

    res.status(201).json({
      status: 'Success',
      location,
    });
  }),
  getLocation: asyncCatch(async (req, res, next) => {
    const location = await Location.findByPk(req.params.id);

    if (location === null) {
      return next(new APIError('Such location does not exist.', 404));
    }

    res.status(200).json({
      status: 'Success',
      location,
    });
  }),
  updateLocation: asyncCatch(async (req, res) => {
    const location = await Location.findByPk(req.params.id);
    const updatedLocation = await location.update(req.body);
    res.status(200).json({
      status: 'Success',
      user: updatedLocation,
    });
  }),
  deleteLocation: asyncCatch(async (req, res) => {
    const locationId = req.params.id;

    const deletedLocation = await Location.destroy({
      where: { locationId: locationId },
    });
    res.status(204).json({
      status: 'Success',
      location: deletedLocation,
    });
  }),
};
