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
        const modifiedPassword = '123' + password + "456"; // เพิ่ม prefix และ suffix

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is missing in environment variables");
            return NextResponse.json(
                { message: "Server configuration error. Please contact support." },
                { status: 500 }
            );
        }


        if (!user) {
            return NextResponse.json(
                { message: "Account does not exist." },
                { status: 404 }
            );
        }

        const isPasswordValid = await bcryptjs.compare(modifiedPassword, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Incorrect password." },
                { status: 401 }
            );
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpCache[email] = { otp };

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

        return NextResponse.json({
            message: "OTP sent successfully!✅",
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error during login:", error.message);
        console.error("Login error:", error);

        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}