import dotenv  from 'dotenv'; 
dotenv.config();
import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectToMongo;
