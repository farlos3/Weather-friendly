import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export async function PUT(request) {
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

    const userId = decoded.id;
    const body = await request.json();
    const { name } = body;

    // ค้นหาและอัปเดตผู้ใช้ในฐานข้อมูล
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    // ตอบกลับข้อมูลผู้ใช้ที่อัปเดตแล้ว
    return NextResponse.json({
      message: "User updated successfully.",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}