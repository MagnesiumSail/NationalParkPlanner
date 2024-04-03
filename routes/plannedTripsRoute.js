const express = require('express');
const PlannedTripsController = require('../controllers/plannedTripsController');

const router = express.Router()

router.get('/', PlannedTripsController.retrieveAllPlannedTrips);

module.exports = router;