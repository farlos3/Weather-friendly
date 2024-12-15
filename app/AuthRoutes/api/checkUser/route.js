import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import nodemailer from "nodemailer";

let otpCache = {}; // เก็บ OTP ชั่วคราว

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email } = await request.json();

        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user);

        if (!user) {
            return NextResponse.json(
                { message: "Email not registered in the system." },
                { status: 404 }
            );
        }

        // สร้าง OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6 หลัก
        otpCache[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP มีอายุ 5 นาที

        // ส่ง OTP ด้วย nodemailer
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

        console.log(`OTP sent to ${email}`);
        
        return NextResponse.json({ message: "OTP sent successfully✅" }, { status: 200 });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ 
            message: "An error occurred while sending OTP.", 
            error: error.message }, { status: 500 }
        );
    }
}