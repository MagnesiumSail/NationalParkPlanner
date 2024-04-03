//all routes will go through here, then split out into their own personal endpoints.
const express = require('express');
const router = express.Router();

//default response
router.get('/', (req, res) => {
    res.json({
        status: 'API is working',
        message: 'Welcome to the API'
    });
});

//All routes
router.use('/accounts', require('./accountsRoute.js'));
router.use('/destinations', require('./destinationRoute.js'));
router.use('/plannedtrips', require('./plannedTripsRoute.js'));
router.use('/supplies', require('./suppliesRoute.js'));



//error handling
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//export router
module.exports = router;
