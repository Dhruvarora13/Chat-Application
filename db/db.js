import mongoose from "mongoose";

const DB_NAME ='Chat-Application';

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`);
        console.log(`Connected to Database host : ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.log("Error Connecting to Database: ", error.message);
        process.exit(1);
    }

    
}
export default connectDB;