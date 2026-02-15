import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if(!DB_URI) {
    throw new Error("Please define Database URI in .env.<development|production>.local file");
}

const connectToDB = async () => {
   try {
    await mongoose.connect(DB_URI)
    console.log("Connected to MongoDB database");    
   } catch (error) {
    console.error(`Error connecting to MongoDB database at ${NODE_ENV} mode:`, error);
    process.exit(1);
   }
}

export default connectToDB