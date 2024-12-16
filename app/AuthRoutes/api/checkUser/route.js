import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import nodemailer from "nodemailer";

var otpCache = {}; // Temporary OTP storage

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email } = await request.json();
        const sanitizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: sanitizedEmail }).select("_id");
        console.log("User: ", user);

        if (!user) {
            return NextResponse.json(
                { message: "Email not registered in the system." },
                { status: 404 }
            );
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        otpCache[sanitizedEmail] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP valid for 5 minutes

        // Log OTP cache contents
        console.log("OTP Cache after storing OTP:", otpCache);

        // Send OTP via nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: sanitizedEmail,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        });

        console.log(`OTP sent to ${sanitizedEmail}`);

        return NextResponse.json({ message: "OTP sent successfully✅" }, { status: 200 });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({
            message: "An error occurred while sending OTP.",
            error: error.message
        }, { status: 500 }
        );
    }
}