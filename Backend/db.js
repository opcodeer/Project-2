import mongoose from 'mongoose';

const mongoURI = "mongodb://127.0.0.1:27017/inotebook?";

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectToMongo;
