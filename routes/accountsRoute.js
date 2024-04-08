const express = require('express');
const accountController = require('../controllers/accountsController');

const router = express.Router()

router.get('/', accountController.retrieveAllAccounts);

//create acconts
// POST route to create a new account
router.post('/', accountController.createUserAccount);

// PUT route to update an account
router.put('/:id', accountController.updateAccount);

// DELETE route to delete an account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
