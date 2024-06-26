import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {fullName,username,password,confirmpassword,gender} = req.body;
    if (password != confirmpassword) {
      console.log("Password and Confirm Password do not match");
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }
    const user = await User.findOne({ username: username });
    if (user) {
      console.log("User already exist :", user);
      return res.status(400).json("User already exist :");
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender == "feamale" ? girlProfilePic : boyProfilePic,
    });
    if (newUser) {
      //GenerateToken 
      await newUser.save();
      generateTokenAndSetCookies(newUser._id, res);
      console.log("User Created Successfully!", newUser);
      return res.status(200).json({ message: "User Created Successfully!" });
    }
    else{
      console.log("User not created");
      return res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

   
};
export const login = async (req, res) => {
  try {
    const {username,password} = req.body;
    const user = await User.findOne({username})
    const isPasswordCorrect = await bcrypt.compare(password,user?.password ||"");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid username or password"})

    }
    generateTokenAndSetCookies(user._id,res);

    res.status(200).json({ 
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
    
  } catch (error) {
    console.log("Error in login controller : ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    
  }
  // res.status(200).json({ message: "Login route works!" });
};
export const logout = (req, res) => {
   try {
    
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message: "User Logged out successfully"})
   } catch (error) {
      console.log("Error in logout controller : ", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    
   }
};
