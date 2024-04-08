const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router()
router.use(express.json());


router.get('/', destinationController.retrieveAllDestinations);
router.get('/:id', destinationController.retrieveDestinationById);
router.post('/', destinationController.addDestination);
router.put('/:id', destinationController.updateDestination);
router.delete('/:id', destinationController.deleteDestination);




module.exports = router;