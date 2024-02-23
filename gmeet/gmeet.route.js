
const express = require('express');

const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const UserDetails = require("../Model/userDetails.model");
getRouter.use(express.json());
postRouter.use(express.json());
putRouter.use(express.json());
deleteRouter.use(express.json());

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
        const user = await UserDetails.findOne({ id: req.params.id });
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
        const { name, lastname, email, id, Meetingid, Title, Link } = req.body;
        const user = await UserDetails.create({ name, lastname, email, id, Meetingid, Title, Link });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
});

putRouter.patch('/updateuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateFields = req.body;

        if (!Object.keys(updateFields).length) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        const user = await UserDetails.findOneAndUpdate(
            {id:userId},
            { $set: updateFields },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


deleteRouter.delete('/deleteuser/:id', async (req, res) => {
    try {
        const user = await UserDetails.findOneAndDelete({ id: req.params.id });
        res.status(200).json("Deleted user");
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

module.exports = { getRouter, postRouter, deleteRouter, putRouter };
