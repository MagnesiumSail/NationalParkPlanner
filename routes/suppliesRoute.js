const express = require('express');
const suppliesController = require('../controllers/suppliesController');

const router = express.Router()

router.get('/', suppliesController.retrieveAllSupplies);

module.exports = router;