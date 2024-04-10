const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');
const accountController = require('../controllers/accountsController');

const router = express.Router()

// Middleware to require authentication for all routes in this router
router.use(requiresAuth());

router.get('/', accountController.retrieveAllAccounts);

//create acconts
// POST route to create a new account
router.post('/', accountController.createUserAccount);

// PUT route to update an account
router.put('/:id', accountController.updateAccount);

// DELETE route to delete an account
router.delete('/:id', accountController.deleteAccount);

module.exports = router;
