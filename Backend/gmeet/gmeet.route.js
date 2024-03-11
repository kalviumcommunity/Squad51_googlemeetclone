
const express = require('express');
const joi=require("joi");

const app = express();
const jwt = require('jsonwebtoken')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const UserDetails = require("../Model/userDetails.model");
const authenticateToken = (req, res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
      if(err) return res.sendStatus(403)
      next()
    })
  }
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
    Link:joi.string(),
    CreatedBy:joi.string()
})

getRouter.get('/getallusers',authenticateToken, async (req, res) => {
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

getRouter.get('/getuser/:id',authenticateToken, async (req, res) => {
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

postRouter.post('/adduser',authenticateToken, async (req, res) => {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const { name, lastname, id, Title, email, Link,CreatedBy } = req.body;
        console.log("id", id, "name", name)

        const user = await UserDetails.create({ name, lastname, email, id, Title, Link,CreatedBy });
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

putRouter.patch('/updateuser/:id',authenticateToken, async (req, res) => {
    const {error,value}=schema.validate(req.body,{abortEarly:false})
    try {
        if(!error){
        const {id} = req.params;
        const filter ={"id":Number(id)}
        let{name, lastname, email, Meetingid, Title, Link,CreatedBy } = req.body;
        const userDetails = await UserDetails.findOneAndUpdate(filter,{name, lastname, email, id, Meetingid, Title, Link,CreatedBy });
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
            message: err
        })
    }
});


deleteRouter.delete('/deleteuser/:id',authenticateToken, async (req, res) => {
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
