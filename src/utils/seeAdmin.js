import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // delete old admin if exists
    await User.deleteMany({ email: "admin@test.com" });

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();
