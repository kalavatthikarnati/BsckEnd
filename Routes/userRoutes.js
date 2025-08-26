//const express = require('express');
const userRouter = express.Router();
//const {registerUser} = require('../controllers/RegisterController')
//const {LoginUser} = require('../controllers/LoginController')
import express from "express";
import registerUser from "../controllers/RegisterController.js";
import LoginUser from "../controllers/LoginController.js";


userRouter.post('/register',registerUser )
userRouter.post('/login', LoginUser)

export default userRouter;
