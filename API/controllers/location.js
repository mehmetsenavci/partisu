const { Location } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');

module.exports = {
  getLocations: asyncCatch(async (req, res) => {
    const locations = await Location.findAll();
    res.status(200).json({
      status: 'Success',
      locations,
    });
  }),
  createLocation: asyncCatch(async (req, res) => {
    const body = req.body;
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
  getLocation: asyncCatch(async (req, res) => {
    const location = await Location.findByPk(req.params.id);
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
