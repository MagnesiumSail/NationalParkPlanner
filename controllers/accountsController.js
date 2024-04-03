
const { ObjectId } = require('mongodb');
const { getDb } = require('../mongoDB/mongodb');

// GET all account in Db
async function retrieveAllAccounts(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const accountCollection = db.collection('UserAccounts');
        const account = await accountCollection.find({}).toArray();

        res.json(account);

        console.log("Function working");
        console.log(JSON.stringify(account));
    } catch (error) {
        console.error('Error retrieving account:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Create a new userAccount
async function createUserAccount(req, res) {
    try {
        // Extract required fields from the request body
        const { username, email, password, firstName, lastName, plannedTripID } = req.body;

        // Validate the required fields
        const validationErrors = [];
        if (!username) validationErrors.push('username is required');
        if (!email) validationErrors.push('email is required');
        if (!password) validationErrors.push('password is required');
        if (!firstName) validationErrors.push('firstName is required');
        if (!lastName) validationErrors.push('lastName is required');
        if (!plannedTripID) validationErrors.push('plannedTripID is required');
        // Add more validation rules as needed...

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const accountsCollection = db.collection('UserAccounts');

        // Construct the userAccount object
        const userAccount = {
            username,
            email,
            password,
            firstName,
            lastName,
            plannedTripID
        };

        // Insert the new userAccount into the database
        const result = await accountsCollection.insertOne(userAccount);

        // Extract the generated userAccount ID from the result
        const userAccountId = result.insertedId;

        // Return the new userAccount ID in the response
        res.status(201).json({ userAccountId });
    } catch (error) {
        console.error('Error creating userAccount:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Update an account
async function updateAccount(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const accountsCollection = db.collection('UserAccounts');

        // Extract accounts ID from the request parameters
        const accountsId = req.params.id;

        // Extract updated fields from the request body
        const { username, email, password, firstName, lastName, plannedTripID } = req.body;

        // Check if the accounts ID is valid
        if (!ObjectId.isValid(accountsId)) {
            return res.status(400).json({ error: 'Invalid accounts ID' });
        }
        
       // List of valid properties for updating a accounts
       const validProperties = ['username', 'email', 'password', 'firstName', 'lastName', 'plannedTripID'];

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
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;
        if (password) updateFields.password = password;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (plannedTripID) updateFields.plannedTripID = plannedTripID;


        // Update the accounts in the database
        await accountsCollection.updateOne({ _id: new ObjectId(accountsId) }, { $set: updateFields });

        // Return success status
        res.sendStatus(204);
    } catch (error) {
        console.error('Error updating accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a accounts
async function deleteAccount(req, res) {
    try {
        const db = getDb();
        if (!db) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const accountsCollection = db.collection('UserAccounts');

        // Extract accounts ID from the request parameters
        const accountsId = req.params.id;

        // Check if the accounts ID is valid
        if (!ObjectId.isValid(accountsId)) {
            return res.status(400).json({ error: 'Invalid accounts ID' });
        }

        // Delete the accounts from the database
        await accountsCollection.deleteOne({ _id: new ObjectId (accountsId) });

        // Return success status
        res.sendStatus(200);
    } catch (error) {
        console.error('Error deleting accounts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { retrieveAllAccounts, createUserAccount, updateAccount, deleteAccount};