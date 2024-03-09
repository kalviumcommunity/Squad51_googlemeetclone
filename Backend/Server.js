var express = require("express");
require("dotenv").config();
var mongoose = require("mongoose");
const { connectdb, isConnected } = require('./dbcom.js');
const { signup, login } = require('../Backend/gmeet/AuthServer.js');
const bodyParser = require('body-parser')
const cors = require('cors');

const { getRouter, postRouter, deleteRouter, putRouter } = require('./gmeet/gmeet.route.js')
var app = express();
app.use(bodyParser.json())
app.use(cors())

app.use(express.json())
app.use("/",signup);
app.use("/",login);

app.get("/", (req, res) => {
    res.send("Hello guys");
});
app.get("/ping", (req, res) => {
    res.send("pong");
});
app.get('/home', (req, res) => {
    res.json({
        message: isConnected() ? 'Database is connected' : 'disconnected'
    })
});
app.use('/', getRouter);
app.use('/', postRouter);
app.use('/', deleteRouter);
app.use('/', putRouter);

app.listen(3000, async () => {
    await connectdb();
    console.log("Server is running on port 3000");
});

