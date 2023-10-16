// routes/user.js

const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config()

userRoutes.post('/register', async (req, res) => {
const user=await User.findOne({email:req.body.email})
if(user){
  res.status(201).json({ message: 'User already exit' });
}else{
  try {
    const { username, email, password,avatar } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword ,avatar});
    await user.save();
    res.status(201).json({ message: ` ${username}  Registraion is succesfull` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
}
  
 
});

userRoutes.post('/login', async (req, res) => {
  try {
    const {username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id,username: username}, process.env.sectretKey);
    res.status(200).json({ token:token,msg:"Login Succersfully",logindata:req.body });
   
  } catch (error) {
    res.status(500).json({ message: 'Failed to authenticate' });
  }
});

module.exports ={
  userRoutes
}