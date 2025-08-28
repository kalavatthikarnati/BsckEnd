
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
        console.log("userExist");
        if (!userExist) {
            res.json({ "sucess": false, "message": "user not registered ,please register first to login" })
        }
        else {
            res.json({"success":true,"message":"user loggedin successfully"})
        }
           

          const isMatch = await bcrypt.compare(password, userExist.password);

             if (isMatch) {
                const loginuser = new LoginModel({
                    email: email,
                    password: password
                })
                const user = await loginuser.save();
               
                const id=user._id;
                 const token = jwt.sign({ id }, process.env.SECRETCODE);
                 console.log("Login token",token);

                res.json({ "sucess": true, "message": "user loggedin successfully", token });
            }
           
        

        }
    catch (error) {
        console.log(error);
        res.json({ "success": false, "message": "some error occured" })
    }

};

export default LoginUser;


