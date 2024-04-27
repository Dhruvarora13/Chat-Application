import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.routes.js";
const app = express();
app.use(express.json({limit :"16kb", extended : true}));
const PORT = process.env.PORT || 5000;

//Routes 
app.use('/api/auth',authRoutes)


//Database Connection

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error Connecting to Database: ", error.message);
    process.exit(1);
  });
