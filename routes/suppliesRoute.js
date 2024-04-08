const express = require('express');
const suppliesController = require('../controllers/suppliesController');

const router = express.Router()

router.get('/', suppliesController.retrieveAllSupplies);

// POST route to create a new supply
router.post('/', suppliesController.createSupplies);

// PuT route to update a new supply
router.put('/:id', suppliesController.updateSupplies);

// DELETE route to delete a new supply
router.delete('/:id', suppliesController.deleteSupplies);


module.exports = router;