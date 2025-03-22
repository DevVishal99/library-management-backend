import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
