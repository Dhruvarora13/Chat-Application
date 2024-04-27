import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

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
      await newUser.save();
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
export const login = (req, res) => {
  res.status(200).json({ message: "Login route works!" });
};
export const logout = (req, res) => {
  res.status(200).json({ message: "Logout route works!" });
};
