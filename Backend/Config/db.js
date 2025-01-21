import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/olx'

export const connectDB = async ()=>{
    try {
        await mongoose.connect(DB_URL);
        console.log('database connected');
    } catch (error) {
        console.log("mongodb connecting error",error);
        
    }
}