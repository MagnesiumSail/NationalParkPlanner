const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router()

router.get('/', destinationController.retrieveAllDestinations);
router.get('/:id', destinationController.retrieveDestinationById);
module.exports = router;