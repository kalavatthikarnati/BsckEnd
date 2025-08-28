import registerModel from "../Models/RegisterModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name,email, password } = req.body;

  try {
    // 1. Check if user exists
    const userExist = await registerModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 2. Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // 3. Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // 4. Hash password
    const salt = await bcrypt.genSalt(10);
    console.log("print the salt",salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashedpassword",hashedPassword);

    // 5. Create new user
    const newUser = new registerModel({
      name,
      
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    const user = await newUser.save();

    // 6. Generate JWT token
    const id =user._id;
    const token = jwt.sign({ id }, process.env.SECRETCODE);
    console.log(token);

    // 7. Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
  console.error("Register error:", error);  // full error, not just message
  res.status(500).json({
    success: false,
    message: "Some error occurred",
    error: error.message,
    stack: error.stack,   // 👈 helps pinpoint exact line
  });
  }

};

export default registerUser;
