import mongoose from "mongoose";

let LoginSchema = new mongoose.Schema({
    "email": { type: String, required: true },
    "password": { type: String, required: true }
})


let LoginModel = new mongoose.model("LoginUser", LoginSchema)
export default LoginModel;
