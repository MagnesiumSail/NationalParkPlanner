const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router()
router.use(express.json());


router.get('/', destinationController.retrieveAllDestinations);
router.get('/:id', destinationController.retrieveDestinationById);
router.post('/', destinationController.addDestination )
module.exports = router;