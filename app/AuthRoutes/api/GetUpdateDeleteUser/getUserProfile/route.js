import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export async function GET(request) {
    try {
        await connectMongoDB();

        const authHeader = request.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json(
                { message: "No token provided. Access denied." },
                { status: 403 }
            );
        }

        const token =
            request.headers.get("x-access-token") ||
            request.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Token not found. Access denied." },
                { status: 403 }
            );
        }

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

        // ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ user ID จาก token
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found." },
                { status: 404 }
            );
        }

        // Respond with User Data
        return NextResponse.json({
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}