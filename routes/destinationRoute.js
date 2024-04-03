const express = require('express');
const destinationController = require('../controllers/destinationController');

const router = express.Router()

router.get('/', destinationController.retrieveAllDestinations);

module.exports = router;