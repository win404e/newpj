import mongoose, { Schema } from "mongoose";

// สร้าง Schema ของผู้ใช้
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // แก้ไขจาก require เป็น required
    },
    email: {
      type: String,
      required: true, // แก้ไขจาก require เป็น required
      unique: true,   // เพิ่ม unique เพื่อป้องกันการซ้ำของอีเมล
    },
    password: {
      type: String,
      required: true, // แก้ไขจาก require เป็น required
    },
    role: {
      type: String,
      required: false, // แก้ไขจาก require เป็น required
      default: "user",
    },
  },
  { timestamps: true }
);

// ตรวจสอบว่าโมเดล User ถูกสร้างแล้วหรือไม่
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
