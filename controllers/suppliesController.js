const { ObjectId } = require('mongodb');
const { getDb } = require('../mongoDB/mongodb');

// GET all Supplies in Db
async function retrieveAllSupplies(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const SuppliesCollection = db.collection('Supplies');
        const Supplies = await SuppliesCollection.find({}).toArray();

        res.json(Supplies);

        console.log("Function working");
        console.log(JSON.stringify(Supplies));
    } catch (error) {
        console.error('Error retrieving Supplies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { retrieveAllSupplies};