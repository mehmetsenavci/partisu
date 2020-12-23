const express = require('express');
const router = express.Router();

const partyController = require('../controllers/party');

router
  .route('/parties')
  .get(partyController.getParties)
  .post(partyController.createParty);

router
  .route('/parties/:id')
  .get(partyController.getParty)
  .patch(partyController.updateParty)
  .delete(partyController.updateParty);

module.exports = router;
