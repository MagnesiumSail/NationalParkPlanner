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

module.exports = { retrieveAllDestinations};