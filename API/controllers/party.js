const { Party, Attendee, User } = require('../models');
const asyncCatch = require('../helpers/asyncCatch');
const APIError = require('../helpers/apiError');

module.exports = {
  getParties: asyncCatch(async (req, res, next) => {
    const parties = await Party.findAll({ include: User });

    if (parties.length === 0) {
      return next(new APIError('There are no parties', 404));
    }

    res.status(200).json({
      status: 'Success',
      parties,
    });
  }),
  createParty: asyncCatch(async (req, res) => {
    // TODO: Edit the +00:00 timezone
    console.log(req.body.startTime);

    const newParty = await Party.create({
      creatorId: req.body.creatorId,
      locationId: req.body.locationId,
      endTime: req.body.endTime,
      startTime: req.body.startTime,
    });

    res.status(201).json({
      status: 'Success',
      newParty,
    });
  }),
  getParty: asyncCatch(async (req, res, next) => {
    const party = await Party.findByPk(req.params.id);

    if (party === null) {
      return next(new APIError('There is no such party', 404));
    }

    res.status(200).json({
      status: 'Success',
      party,
    });
  }),
  updateParty: asyncCatch(async (req, res) => {
    const party = await Party.findByPk(req.params.id);
    const updatedParty = await party.update(req.body);
    res.status(200).json({
      status: 'Success',
      updatedParty,
    });
  }),
  deletedParty: asyncCatch(async (req, res) => {
    const deletedParty = await Party.destroy({
      where: { partyId: req.params.id },
    });
    res.status(204).json({
      status: 'Success',
      user: deletedParty,
    });
  }),
  getAttendeesForParty: asyncCatch(async (req, res, next) => {
    const attendies = await Attendee.findAll({
      where: { partyId: req.params.id },
      include: User,
    });

    if (attendies.length === 0) {
      return next(new APIError('There are no attendies for given party.', 404));
    }

    res.status(200).json({
      status: 'Success',
      attendies,
    });
  }),
  createAttendeeForParty: asyncCatch(async (req, res) => {
    const newAttendee = await Attendee.create({
      attendeeId: req.body.attendeeId,
      partyId: req.params.id,
    });

    res.status(201).json({
      status: 'Success',
      newAttendee,
    });
  }),
  getAttendeeFromParty: asyncCatch(async (req, res, next) => {
    const attendee = await Attendee.findOne({
      where: { partyId: req.params.id, attendeeId: req.params.attendeeId },
      include: User,
    });

    if (attendee === null) {
      return next(
        new APIError('That user is not attending to this party.', 404)
      );
    }

    res.status(200).json({
      status: 'Success',
      attendee,
    });
  }),
  deleteAttendeeFromParty: asyncCatch(async (req, res) => {
    const deletedAttendee = await Attendee.destroy({
      where: { partyId: req.params.id, attendeeId: req.params.attendeeId },
    });
    res.status(204).json({
      status: 'Success',
      user: deletedAttendee,
    });
  }),
};
