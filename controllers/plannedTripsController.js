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

// POST to add a new planned trip to a database:
const addPlannedTrip = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
       
        const plannedtrip = {
            PlannedTripID: req.body.PlannedTripID,
            PlannedTripStartDate: req.body.PlannedTripStartDate,
            PlannedTripEndDate: req.body.PlannedTripEndDate,
            PlannedTripState: req.body.PlannedTripState,
            PlannedTripDestination: req.body.PlannedTripDestination
        };

        const plannedTripsCollection = db.collection('PlannedTrips');
        const response = await plannedTripsCollection.insertOne(plannedtrip);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the planned trip.' });
        }
    } catch (error) {
        console.error('Error adding planned trip:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePlannedTrip = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const plannedTripsId = req.params.id;
        if (!ObjectId.isValid(plannedTripsId)) {
            return res.status(400).json({ error: 'Invalid planned trip ID' });
        }

        const plannedTripsUpdates = {
            PlannedTripID: req.body.PlannedTripID,
            PlannedTripStartDate: req.body.PlannedTripStartDate,
            PlannedTripEndDate: req.body.PlannedTripEndDate,
            PlannedTripState: req.body.PlannedTripState,
            PlannedTripDestination: req.body.PlannedTripDestination
        };

        const plannedTripsCollection = db.collection('PlannedTrips');
        const response = await plannedTripsCollection.updateOne(
            { _id: new ObjectId(plannedTripsId) },
            { $set: plannedTripsUpdates }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Planned trips updated successfully' });
        } else {
            res.status(404).json({ error: 'Planned trips not found' });
        }
    } catch (error) {
        console.error('Error updating planned trips:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deletePlannedTrip = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const plannedTripsId = req.params.id;
        if (!ObjectId.isValid(plannedTripsId)) {
            return res.status(400).json({ error: 'Invalid planned trip ID' });
        }

        const plannedTripsCollection = db.collection('PlannedTrips');
        const response = await plannedTripsCollection.deleteOne({ _id: new ObjectId(plannedTripsId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Destination deleted successfully' });
        } else {
            res.status(404).json({ error: 'Planned trip not found' });
        }
    } catch (error) {
        console.error('Error deleting the planned trip:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};









module.exports = { retrieveAllPlannedTrips, retrievePlannedTripsById, addPlannedTrip, updatePlannedTrip, deletePlannedTrip};