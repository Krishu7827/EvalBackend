const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const {router} = require("./Router/Routers")
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config()

// Connect to MongoDB
let MongoDB = process.env.MongoDB || "mongodb://localhost:27017"
mongoose.connect( `${MongoDB}/bookFind`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



// Defined  routes 
app.use("/api",router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });