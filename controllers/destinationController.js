const { ObjectId } = require('mongodb');
const { getDb } = require('../mongoDB/mongodb');

// GET all destinations in Db
async function retrieveAllDestinations(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const destinationsCollection = db.collection('Destination');
        const destinations = await destinationsCollection.find({}).toArray();

        res.json(destinations);

        console.log("Function working");
        console.log(JSON.stringify(destinations));
    } catch (error) {
        console.error('Error retrieving destinations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// GET one specific destination ID:
async function retrieveDestinationById(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const destinationId = req.params.id; // Retrieve destination ID from URL params
        if (!ObjectId.isValid(destinationId)) {
            return res.status(400).json({ error: 'Invalid destination ID' });
        }

        const destinationsCollection = db.collection('Destination');
        const destination = await destinationsCollection.findOne({ _id: new ObjectId(destinationId) });

        if (!destination) {
            return res.status(404).json({ error: 'Destination not found' });
        }

        res.json(destination);

        console.log("Function working");
        console.log("Retrieved destination:", destination);
    } catch (error) {
        console.error('Error retrieving destination by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// POST create a new destination object in the database 
const addDestination = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
       
        const destination = {
            name: req.body.name,
            state: req.body.state,
            location: req.body.location,
            description: req.body.description,
            coordinates: req.body.coordinates,
            establishedDate: req.body.establishedDate,
            area: req.body.area,
            activities: req.body.activities,
            imageUrl: req.body.imageUrl
        };

        const destinationsCollection = db.collection('Destination');
        const response = await destinationsCollection.insertOne(destination);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the destination.' });
        }
    } catch (error) {
        console.error('Error adding destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// PUT update an aexisting destination's fields based on the destination's ID:
const updateDestination = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const destinationId = req.params.id;
        if (!ObjectId.isValid(destinationId)) {
            return res.status(400).json({ error: 'Invalid destination ID' });
        }

        const destinationUpdates = {
            name: req.body.name,
            state: req.body.state,
            location: req.body.location,
            description: req.body.description,
            coordinates: req.body.coordinates,
            establishedDate: req.body.establishedDate,
            area: req.body.area,
            activities: req.body.activities,
            imageUrl: req.body.imageUrl
        };

        const destinationsCollection = db.collection('Destination');
        const response = await destinationsCollection.updateOne(
            { _id: new ObjectId(destinationId) },
            { $set: destinationUpdates }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Destination updated successfully' });
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error updating destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an existing destination from the database
const deleteDestination = async (req, res) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const destinationId = req.params.id;
        if (!ObjectId.isValid(destinationId)) {
            return res.status(400).json({ error: 'Invalid destination ID' });
        }

        const destinationsCollection = db.collection('Destination');
        const response = await destinationsCollection.deleteOne({ _id: new ObjectId(destinationId) });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Destination deleted successfully' });
        } else {
            res.status(404).json({ error: 'Destination not found' });
        }
    } catch (error) {
        console.error('Error deleting destination:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { retrieveAllDestinations, retrieveDestinationById, addDestination, updateDestination, deleteDestination };