const express = require('express');

const router = express.Router();
const partyController = require('../controllers/partiesController');

router
  .route('/parties')
  .get(partyController.getParties)
  .post(partyController.createParty);

router
  .route('/parties/:id')
  .get(partyController.getParty)
  .patch(partyController.updateParty)
  .delete(partyController.deletedParty);

router
  .route('/parties/:id/attendees')
  .get(partyController.getAttendeesForParty)
  .post(partyController.createAttendeeForParty);

router
  .route('/parties/:id/attendees/:attendeeId')
  .get(partyController.getAttendeeFromParty)
  .delete(partyController.deleteAttendeeFromParty);

module.exports = router;
