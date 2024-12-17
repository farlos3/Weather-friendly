import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user"; // ใช้ mongoose model
import { connectMongoDB } from "@/lib/mongodb";

export async function DELETE(request) {
    try {
        // เชื่อมต่อ MongoDB
        await connectMongoDB();

        // ตรวจสอบ Authorization Header
        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json(
                { message: "No token provided. Access denied." },
                { status: 403 }
            );
        }

        // ดึง token จาก header
        const token =
            request.headers.get("x-access-token") ||
            request.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Token not found. Access denied." },
                { status: 403 }
            );
        }

        // ตรวจสอบและถอดรหัส token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log("Token Verified");
        } catch (error) {
            console.error("Token verification failed:", error);
            return NextResponse.json(
                { message: "Invalid or expired token." },
                { status: 401 }
            );
        }

        // ลบ user โดยใช้ ID ที่ได้จาก token
        const userId = decoded.id; // `id` ต้องถูกฝังใน token ตอนสร้าง
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        await User.findByIdAndDelete(userId);

        return NextResponse.json(
            { message: "Account deleted successfully." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json(
            { message: "Server error while deleting account." },
            { status: 500 }
        );
    }
}
