import jwt from "jsonwebtoken"

const generateTokenAndSetCookies = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWTR_SECRET,{
        expiresIn: '154'

    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, //MiliSeconds
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRf attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookies;