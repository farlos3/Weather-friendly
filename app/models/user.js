import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid"; // ใช้ UUID package เพื่อสร้าง UID

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: false,
            default: "user",
        }
    },
    { timestamps: true }
);

// Middleware สำหรับสร้าง UID อัตโนมัติ
userSchema.pre("save", function (next) {
    if (!this.uid) { // ตรวจสอบว่า UID ยังไม่มีการกำหนด
        this.uid = uuidv4(); // สร้าง UID ด้วย UUID v4
    }
    next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;