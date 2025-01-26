import mongoose from 'mongoose';

const DB_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/olx';

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};
