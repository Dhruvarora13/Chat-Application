import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./db/db.js";
const app = express();
const PORT = process.env.PORT || 5000;



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
