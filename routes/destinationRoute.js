const express = require('express');
const destinationController = require('../controllers/destinationController');
const { auth, requiresAuth } = require('express-openid-connect');

const router = express.Router()

router.get('/', destinationController.retrieveAllDestinations);

module.exports = router;