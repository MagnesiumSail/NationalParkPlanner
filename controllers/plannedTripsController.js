const { ObjectId } = require('mongodb');
const { getDb } = require('../mongoDB/mongodb');

// GET all planned trips in Db
async function retrieveAllPlannedTrips(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const PlannedTripsCollection = db.collection('PlannedTrips');
        const PlannedTrips = await PlannedTripsCollection.find({}).toArray();

        res.json(PlannedTrips);

        console.log("Function working");
        console.log(JSON.stringify(PlannedTrips));
    } catch (error) {
        console.error('Error retrieving PlannedTrips:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { retrieveAllPlannedTrips};