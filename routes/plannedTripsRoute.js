const express = require('express');
const PlannedTripsController = require('../controllers/plannedTripsController');

const router = express.Router();
router.use(express.json());


router.get('/', PlannedTripsController.retrieveAllPlannedTrips);
// get a specific plannedtrip by id:
router.get('/:id', PlannedTripsController.retrievePlannedTripsById);
module.exports = router;