var express = require("express");
require("dotenv").config(); 
var mongoose = require("mongoose");
const {connectdb, isConnected} = require('./dbcom.js');
const bodyParser=require('body-parser')
const { getRouter, postRouter, deleteRouter, putRouter } = require('./gmeet/gmeet.route.js')
var app = express();
app.use(bodyParser.json())

app.use("/",getRouter)
app.use("/",postRouter)
app.use("/",putRouter)
app.use("/",deleteRouter)

app.get("/ping", (req, res) => {
    res.send("pong");
});
app.get('/home', (req, res) => {
    res.json({
      message: isConnected() ? 'Database is connected' : 'disconnected'
    })
});
app.use('/',getRouter);
app.use('/',postRouter);
app.use('/',deleteRouter);
app.use('/',putRouter);
app.get("/", (req, res) => {
    res.send("Hello guys");
});

app.listen(4000,async() => {
    await connectdb();
    console.log("Server is running on port 3000");
});

