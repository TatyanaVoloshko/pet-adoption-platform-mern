require("dotenv").config()

const express = require("express")
const mongoose = require('mongoose')
const petRouts = require('./config/petRoutes')

// express app
const app = express();

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/pets', petRouts)

//connect to DB
mongoose.connect(process.env.DB_URI)
    .then(() => {
      // listen for requests
      app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT);
      })
    })
    .catch((error) => {
    console.log(error)
})


