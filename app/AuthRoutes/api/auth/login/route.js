import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

var otpCache = {};

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        const modifiedPassword = "123" + password + "456"; // เพิ่ม prefix และ suffix

        if (!user) {
            return NextResponse.json({ message: "Account does not exist." }, { status: 404 });
        }

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is missing in environment variables");
            return NextResponse.json(
                { message: "Server configuration error. Please contact support." },
                { status: 500 }
            );
        }

        const isPasswordValid = await bcryptjs.compare(modifiedPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Incorrect password." }, { status: 401 });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes 

        otpCache[email] = { otp, expiresAt };

        console.log("Generated OTP:", otp);
        console.log("OTP Cache:", otpCache);

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

        // Send OTP to verifyOtp API
        const verifyOtpResponse = await fetch(`http://localhost:3000/AuthRoutes/api/auth/verifyOtp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, action: "store" }),
        });        

        if (!verifyOtpResponse.ok) {
            return NextResponse.json({ message: "Failed to store OTP for verification." }, { status: 500 });
        }

        return NextResponse.json({ message: "OTP sent successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error during login:", error.message);
        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}