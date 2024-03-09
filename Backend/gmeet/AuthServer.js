const express = require('express')
require('dotenv').config   
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signup =express.Router();
const userModel = require('../Model/User.modal')
const login = express.Router();
signup.post('/signup',async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
        }
         await userModel.create(newUser);
         const accessToken = jwt.sign(hashedPassword,process.env.ACCESS_TOKEN_SECRET )
        res.status(201).json({message:"Signup successful",accessToken: accessToken});
    }catch(err){
        res.status(500).json(err);
    }
});
login.post('/login',async (req, res) => {
    const user = await userModel.findOne({username:req.body.username});
   if(user==null){
    return res.status(400).send('Cannot find user');
   }
   try{
    if(await bcrypt.compare(req.body.password,user.password)){
        const accessToken = jwt.sign(user.password,process.env.ACCESS_TOKEN_SECRET )
        res.json( {accessToken: accessToken})
    }else{
        res.send('Wrong Password')
    }
   }catch(err){
    res.status(500).json(user);
    console.log(user)
   }
})
module.exports = {login,signup}

