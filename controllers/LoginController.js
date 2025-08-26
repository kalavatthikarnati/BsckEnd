//const express = require('express')
//import LoginModel from '../Models/LoginModel.js';
//const validator = require("validator");
//const bcrypt = require('bcryptjs');
//const jwt = require("jsonwebtoken");
import express from "express";
import LoginModel from "../Models/LoginModel.js";
import registerModel from "../Models/RegisterModel.js"; // use the same model you used for signup
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const LoginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const userExist = await registerModel.findOne({ email })
        console.log(userExist);
        if (!userExist) {
            res.json({ "sucess": false, "message": "user not registered ,please register first to login" })
        }
        else {
            //password matching
               
          const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

                const loginuser = new LoginModel({

                    email: email,
                    password: password
                })
                const user = await loginuser.save();
                 const token = jwt.sign({ id: user._id }, "Kalavathi");


                res.json({ "sucess": true, "message": "user loggedin successfully", token });
            }
           
        }

    
    catch (error) {
        console.log(error);
        res.json({ "success": false, "message": "some error occured" })
    }

};

export default LoginUser;


