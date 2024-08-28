import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    }catch (error) {
        console.log("Connect complete");
        console.log("Error connect to mongodb",error);
    };

}