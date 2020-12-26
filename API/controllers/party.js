const { Party, Attendee } = require('../models');

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
      //TODO: Edit the +00:00 timezone
      console.log(req.body.startTime);

      const newParty = await Party.create({
        creatorId: req.body.creatorId,
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
  getAttendeesForParty: async (req, res) => {
    try {
      const attendies = await Attendee.findAll({
        where: { partyId: req.params.id },
      });
      res.status(200).json({
        status: 'Success',
        attendies,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  createAttendeeForParty: async (req, res) => {
    try {
      const newAttendee = await Attendee.create({
        attendeeId: req.body.attendeeId,
        partyId: req.params.id,
      });

      res.status(200).json({
        status: 'Success',
        newAttendee,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  getAttendeeFromParty: async (req, res) => {
    try {
      const attendee = await Attendee.findOne({
        where: { partyId: req.params.id, attendeeId: req.params.attendeeId },
      });
      res.status(200).json({
        status: 'Success',
        attendee,
      });
    } catch (err) {
      res.json({
        status: 'failed',
        error: err.message,
      });
    }
  },
  deleteAttendeeFromParty: async (req, res) => {
    try {
      const deletedAttendee = await Attendee.destroy({
        where: { partyId: req.params.id, attendeeId: req.params.attendeeId },
      });
      res.status(200).json({
        status: 'Success',
        user: deletedAttendee,
      });
    } catch (err) {
      res.json({
        status: 'Failed',
        error: err.message,
      });
    }
  },
};
