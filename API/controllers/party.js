const { User, Favorite, Location, Party } = require('../models');

module.exports = {
  getParties: async (req, res) => {
    try {
      const parties = await Party.findAll();
      res.status(200).json({
        status: 'Success',
        parties,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  createParty: async (req, res) => {
    try {
      const newParty = await Party.create({
        creatorId: req.boy.creatorId,
        locationId: req.body.locationId,
        endTime: req.body.endTime,
        startTime: req.body.startTime,
      });
      res.status(200).json({
        status: 'Success',
        newParty,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  getParty: async (req, res) => {
    try {
      const party = await Party.findByPk(req.params.id);
      res.status(200).json({
        status: 'Success',
        party,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  updateParty: async (req, res) => {
    try {
      const party = Party.findByPk(req.params.id);
      const updatedParty = party.update(req.body);
      res.status(200).json({
        status: 'Success',
        updatedParty,
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
      const deletedParty = await Party.destroy({
        where: { favoriteId: req.params.id },
      });
      res.status(200).json({
        status: 'Success',
        user: deletedParty,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
};
