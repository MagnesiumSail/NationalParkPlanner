const express = require('express');
const PlannedTripsController = require('../controllers/plannedTripsController');

const router = express.Router();
router.use(express.json());


router.get('/', PlannedTripsController.retrieveAllPlannedTrips);
// get a specific plannedtrip by id:(followed by /plannedtrips/id))
router.get('/:id', PlannedTripsController.retrievePlannedTripsById);
//post request to add a new planned trip:
router.post('/', PlannedTripsController.addPlannedTrip);
// put request to edit an existing planned trip:
router.put('/:id', PlannedTripsController.updatePlannedTrip);
// delete request to remove a planned trip by id:
router.delete('/:id', PlannedTripsController.deletePlannedTrip)



module.exports = router;