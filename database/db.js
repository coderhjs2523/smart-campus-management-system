import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ DataBase Connected Successfully...`);
    console.log(`📦 Host: ${conn.connection.host}`);

  } catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    process.exit(1); // Stop server if DB fails
  }
};

export default connectDB;