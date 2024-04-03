const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger-output.json')
const express = require('express');
const cors = require('cors')
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const { initDb } = require('./mongoDB/mongodb.js')
const router = require('./routes/index.js')

const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/', (router));

// Add support for CORS
app.use(cors());

//initialize mongoDB
initDb((err) => {
    if (err) {
        console.error('Error initializing MongoDB:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));