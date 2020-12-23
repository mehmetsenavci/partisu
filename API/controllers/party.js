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
      const endTime = new Date(req.body.endTime).toISOString();
      const startTime = new Date(req.body.startTime).toISOString();
      console.log(endTime);

      //TODO: Edit the +00:00 timezone

      const newParty = await Party.create({
        creatorId: req.body.creatorId,
        locationId: req.body.locationId,
        endTime: endTime,
        startTime: startTime,
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
      const party = await Party.findByPk(req.params.id);
      const updatedParty = await party.update(req.body);
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
  deletedParty: async (req, res) => {
    try {
      const deletedParty = await Party.destroy({
        where: { partyId: req.params.id },
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
