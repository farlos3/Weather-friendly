import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

let otpCache = {}; // เก็บ OTP ชั่วคราว

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        const modifiedPassword = '123' + password + "456"; // แปลงรหัสผ่านโดยเพิ่ม prefix และ suffix

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is missing in environment variables");
            return NextResponse.json(
                { message: "Server configuration error. Please contact support." },
                { status: 500 }
            );
        }

        if (user && (await bcryptjs.compare(modifiedPassword, user.password))) {
            const otp = Math.floor(100000 + Math.random() * 900000); // 6 หลัก
            otpCache[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP มีอายุ 5 นาที

            console.log("\n", otpCache[email], "\n")

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.GMAIL_USER,
                to: email,
                subject: "Your OTP Code",
                text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
            });

            return NextResponse.json({ message: "OTP sent successfully✅" }, { status: 200 });

        } else {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        console.error("Login error:", error);

        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}
