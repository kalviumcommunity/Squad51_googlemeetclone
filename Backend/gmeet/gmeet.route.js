
const express = require('express');
const joi=require("joi");

const app = express();

const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const UserDetails = require("../Model/userDetails.model");
getRouter.use(express.json());
postRouter.use(express.json());
putRouter.use(express.json());
deleteRouter.use(express.json());

const schema=joi.object({
    name:joi.string(),
    lastname:joi.string(),
    email:joi.string(),
    id:joi.number(), 
    Title:joi.string(), 
    Link:joi.string()
})

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
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const { name, lastname, id, Title, email, Link } = req.body;
        console.log("id", id, "name", name)

        const user = await UserDetails.create({ name, lastname, email, id, Title, Link });
        res.status(201).json(user);
        }
        else {
            return res.status(400).send({
                message: `Bad request, error:${error}`
            })
            console.error(error)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err
        });
    }
});

putRouter.patch('/updateuser/:id', async (req, res) => {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const {id} = req.params;
        const filter ={"id":Number(id)}
        let{name, lastname, email, Meetingid, Title, Link } = req.body;
        const userDetails = await UserDetails.findOneAndUpdate(filter,{name, lastname, email, id, Meetingid, Title, Link });
        res.status(200).json(userDetails);
        }else {
            return res.status(400).send({
                message: `Bad request, error:${error}`
            })
            console.error(error)
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        })
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
