const express = require('express');
const accountController = require('../controllers/accountsController');

const router = express.Router()

router.get('/', accountController.retrieveAllAccounts);

//create acconts
// POST route to create a new account
router.post('/', accountController.createUserAccount);

// POST route to create a new account
router.put('/:id', accountController.updateAccount);

// POST route to create a new account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
