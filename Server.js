var express = require("express");
require("dotenv").config(); // Don't forget to invoke the config method
var mongoose = require("mongoose");
const {connectdb, isConnected} = require('./dbcom.js');
var app = express();

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.get('/home', (req, res) => {
    res.json({
      message: isConnected() ? 'Database is connected' : 'disconnected'
    })
});
app.get("/", (req, res) => {
    res.send("Hello guys");
});

app.listen(3000,async() => {
    await connectdb();
    console.log("Server is running on port 3000");
    // mongoose.connection.on('connected', () => {
    //     console.log("Connected to MongoDB");
    // });
    // mongoose.connection.on('error', (err) => {
    //     console.error("MongoDB connection error:", err);
    // });
});

