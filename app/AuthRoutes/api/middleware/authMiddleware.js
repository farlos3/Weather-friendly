import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Middleware สำหรับตรวจสอบ token
const authMiddleware = async (request, handler) => {
    try {
        // ดึง token จาก cookies หรือ headers
        const token = request.cookies.get("token") || request.headers.get("Authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ message: "Access denied. No token provided." }, { status: 401 });
        }

        // ตรวจสอบความถูกต้องของ token
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        request.user = verified;
        console.log("Token Verified:", verified);

        // ทำงานต่อไปโดยใช้ handler ที่ได้รับ
        return handler();
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.json({ message: "Invalid or expired token." }, { status: 403 });
    }
};

export default authMiddleware;