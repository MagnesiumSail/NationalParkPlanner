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


// GET one specific planned trip ID:
async function retrievePlannedTripsById(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const plannedTripsId = req.params.id; // Retrieve Planned trips ID from URL params
        if (!ObjectId.isValid(plannedTripsId)) {
            return res.status(400).json({ error: 'Invalid planned trip ID' });
        }

        const plannedTripsCollection = db.collection('PlannedTrips');
        const plannedTrips = await plannedTripsCollection.findOne({ _id: new ObjectId(plannedTripsId) });

        if (!plannedTrips) {
            return res.status(404).json({ error: 'Planned Trip not found' });
        }

        res.json(plannedTrips);

        console.log("Function working");
        console.log("Retrieved Planned Trip:", plannedTrips);
    } catch (error) {
        console.error('Error retrieving planned trip by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}










module.exports = { retrieveAllPlannedTrips, retrievePlannedTripsById};