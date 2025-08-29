import express from "express";
import jwt from "jsonwebtoken"; 
import mongoose from "mongoose";
const app =express()
import registerUser from "./controllers/RegisterController.js";
import LoginUser from "./controllers/LoginController.js";
import dbConnection from "./db.js"; 
import 'dotenv/config'

import cors from "cors";
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: '*'}));

 //middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users',registerUser)
app.use('/api/users',LoginUser)


// Customer Schema + Model
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String
});

const Customer = mongoose.model("Customer", customerSchema);
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});
app.post("/customers", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});
app.put("/customers/:id", async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});
app.delete("/customers/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});


const authmiddleware =async(req,res,next)=>{
    console.log('I am a middleware');
    const {token}=req.headers;
    console.log(token)
    console.log("req.headers is");
    console.log(req.headers)
    if(!token){
        res.json({success:false,message:"Not Authorized User"})
    }
    try{
        //console.log(`decoding ${token}`);
        //const token_decode = jwt.verify(token,"Kalavathi");
        //console.log( token_decode);
        //req.body.userId = token_decode.id;
        console.log(`decoding ${token}`);
    const token_decode = jwt.verify(token, "Kalavathi");
    console.log(token_decode);

    // ✅ safer way: attach to req.user
    req.user = { id: token_decode.id };

    
        next();
    }
    catch(error)
    {
      console.log(error);
      res.json({success:false,message:"Error"})
    }
}

app.get('/addTocart',authmiddleware,(req,res)=>{
  
    res.json({success:true,message:"added to cart successfully"})
})
dbConnection();

const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
