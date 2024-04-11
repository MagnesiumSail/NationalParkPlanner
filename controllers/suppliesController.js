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

// Create a new Supplies
async function createSupplies(req, res) {
    try {
        // Extract required fields from the request body
        const { name, description, quantity, date } = req.body;

        // Validate the required fields
        const validationErrors = [];
        if (!name) validationErrors.push('name is required');
        if (!description) validationErrors.push('description is required');
        if (!quantity) validationErrors.push('quantity is required');
        if (!date) validationErrors.push('date is required');
        // Add more validation rules as needed...

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const SuppliesCollection = db.collection('Supplies');

        // Construct the Supplies object
        const Supplies = {
            name,
            description,
            quantity,
            date,
        };

        // Insert the new Supplies into the database
        const result = await SuppliesCollection.insertOne(Supplies);

        // Extract the generated Supplies ID from the result
        const SuppliesId = result.insertedId;

        // Return the new Supplies ID in the response
        res.status(201).json({ SuppliesId });
    } catch (error) {
        console.error('Error creating Supplies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update an Supplies
async function updateSupplies(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const SuppliesCollection = db.collection('Supplies');

        // Extract Supplies ID from the request parameters
        const SuppliesId = req.params.id;

        // Extract updated fields from the request body
        const { name, description, quantity, date, lastName, plannedTripID } = req.body;

        // Check if the Supplies ID is valid
        if (!ObjectId.isValid(SuppliesId)) {
            return res.status(400).json({ error: 'Invalid Supplies ID' });
        }
        
       // List of valid properties for updating a Supplies
       const validProperties = ['name', 'description', 'quantity', 'date'];

       // Array to hold validation errors
       const validationErrors = [];

       // Check if any updated property is not in the list of valid properties
       for (const property in req.body) {
           if (!validProperties.includes(property)) {
               validationErrors.push(`${property} is not a valid property for updating`);
           }
       }

       // Check if there are any validation errors
       if (validationErrors.length > 0) {
        // Return 400 Bad Request with validation errors
        return res.status(400).json({ errors: validationErrors });
    }


        // Construct update query
        const updateFields = {};
        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (quantity) updateFields.quantity = quantity;
        if (date) updateFields.date = date;


        // Update the Supplies in the database
        await SuppliesCollection.updateOne({ _id: new ObjectId(SuppliesId) }, { $set: updateFields });

        // Return success status
        res.sendStatus(204);
    } catch (error) {
        console.error('Error updating Supplies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a Supplies
async function deleteSupplies(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const SuppliesCollection = db.collection('Supplies');

        // Extract Supplies ID from the request parameters
        const SuppliesId = req.params.id;

        // Check if the Supplies ID is valid
        if (!ObjectId.isValid(SuppliesId)) {
            return res.status(400).json({ error: 'Invalid Supplies ID' });
        }

        // Delete the Supplies from the database
        await SuppliesCollection.deleteOne({ _id: new ObjectId (SuppliesId) });

        // Return success status
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting Supplies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get supplies by ID
async function getSuppliesById(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const SuppliesCollection = db.collection('Supplies');

        // Extract Supplies ID from the request parameters
        const SuppliesId = req.params.id;

        // Check if the Supplies ID is valid
        if (!ObjectId.isValid(SuppliesId)) {
            return res.status(400).json({ error: 'Invalid Supplies ID' });
        }

        // Find the Supplies in the database
        const Supplies = await SuppliesCollection.findOne({ _id: new ObjectId(SuppliesId) });

        // Check if the Supplies was found
        if (!Supplies) {
            return res.status(404).json({ error: 'Supplies not found' });
        }

        // Return the Supplies
        res.json(Supplies);
    } catch (error) {
        console.error('Error retrieving Supplies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { retrieveAllSupplies, createSupplies, updateSupplies, deleteSupplies, getSuppliesById};