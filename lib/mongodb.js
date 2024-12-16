// lib/connectMongoDB.js
import mongoose from 'mongoose';

let isConnected = false; // ตัวแปรเพื่อเก็บสถานะการเชื่อมต่อ

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true; // กำหนดว่าเชื่อมต่อแล้ว
    console.log("Connected to MongoDB✅");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
