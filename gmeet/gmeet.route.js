
const express = require('express');

const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const UserDetails = require("../Model/userDetails.model");

getRouter.get('/getallusers', async (req, res) => {
    try {
        const users = await UserDetails.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

getRouter.get('/getuser/:id', async (req, res) => {
    try {
        const user = await UserDetails.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

postRouter.post('/adduser', async (req, res) => {
    try {
        const { name, lastname, email, id, Meeting_id, Title, Link } = req.body;
        const user = await UserDetails.create({ name, lastname, email, id, Meeting_id, Title, Link });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
});

putRouter.put('/updateuser/:id', async (req, res) => {
    try {
        const { name, lastname, email, id, Meeting_id, Title, Link } = req.body;
        const user = await UserDetails.findOneAndUpdate({ _id: req.params.id }, { name, lastname, email, id, Meeting_id, Title, Link }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

deleteRouter.delete('/deleteuser/:id', async (req, res) => {
    try {
        const user = await UserDetails.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = { getRouter, postRouter, deleteRouter, putRouter };
