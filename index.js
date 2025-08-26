import express from "express";
import jwt from "jsonwebtoken"; 
const app =express()
import registerUser from "./controllers/RegisterController.js";
import LoginUser from "./controllers/LoginController.js";
import dbConnection from "./db.js"; 
import cors from "cors";
const port =4000

app.use(cors({
  origin: 'http://localhost:5173'}));

 //middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users',registerUser)
app.use('/api/users',LoginUser)


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

app.listen('4000', () => {
    console.log('server started at 4000')
})
