import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  await User.create({
    name: "Admin User",
    email: "admin@test.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
};

createAdmin();
