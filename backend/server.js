//backend/services/server.js

const express = require("express")
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const petRouts = require('./config/petRoutes')

// express app
const app = express();

//middleware
app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes--------------------------------------------------------------------------------------
app.use('/api/pets', petRouts)
//auth
const authRoutes = require('./config/authRoutes');
app.use('/api/auth', authRoutes);




//connect to DB
// mongoose.connect(process.env.DB_URI)
//     .then(() => {
//       // listen for requests
//       app.listen(process.env.PORT, () => {
//         console.log("connected to db & listening on port", process.env.PORT);
//       })
//     })
//     .catch((error) => {
//     console.log(error)
// })


// Define function to connect to the database
function connectToDatabase(uri) {
    return mongoose.connect(uri);
}

// Primary DB URI from environment variable
const primaryDbUri = process.env.DB_URI;

// Attempt to connect using the primary DB URI
connectToDatabase(primaryDbUri)
    .then(() => {
        // Listen for requests once the database connection is established
        app.listen(process.env.PORT, () => {
            console.log("Connected to DB & listening on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.error("Failed to connect using primary DB URI:", error);

        // Construct secondary DB URI using template
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const secondaryDbUri = primaryDbUri.replace('<username>', username).replace('<password>', password);

        // Attempt to connect using the secondary DB URI
        connectToDatabase(secondaryDbUri)
            .then(() => {
                app.listen(process.env.PORT, () => {
                    console.log("Connected to DB with secondary URI & listening on port", process.env.PORT);
                });
            })
            .catch((error) => {
                console.error("Failed to connect using secondary DB URI:", error);
                // Handle failure appropriately
            });
    });

