// Load environment variables from .env file
require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGODB_URI;  // Read connection string from .env
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => console.log("Error in connecting to the Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/add", (req, res) => {
    const { category_select, amount_input, info, date_input } = req.body;

    const data = {
        Category: category_select,
        Amount: amount_input,
        Info: info,
        Date: date_input
    };

    db.collection('users').insertOne(data, (err) => {
        if (err) {
            res.status(500).send("Error inserting record");
            return;
        }
        // No need to send a success message (It was for my convinient may be in future it should be updated.)
        res.status(200).send(); 
    });
});

app.get("/", (req, res) => {
    res.set({ "Allow-access-Allow-Origin": '*' });
    return res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});


