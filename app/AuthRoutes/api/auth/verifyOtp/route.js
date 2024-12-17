import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";

var otpCache = {}; // Temporary OTP storage

export async function POST(req) {
    try {
        const { email, otp } = await req.json();
        console.log("\nRequest Data:", { email, otp });
        console.log("Email:", email, ", Type of Email:", typeof email);

        console.log("\nOTP Cache before retrieval:", otpCache);
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes 
        otpCache[email] = { otp, expiresAt };

        console.log("OTP Cache after retrieval:", otpCache);

        const cacheEntry = otpCache[email];

        if (!cacheEntry) {
            console.log(`OTP not found for email: ${email}\n`);
            return NextResponse.json({
                success: false,
                error: "OTP expired or not found."
            }, { status: 400 });
        }

        // Check if OTP has expired
        if (Date.now() > cacheEntry.expiresAt) {
            delete otpCache[email]; // Remove expired OTP
            return NextResponse.json({
                success: false,
                error: "OTP expired."
            }, { status: 400 });
        }

        // Verify OTP by comparing with the stored OTP
        if (cacheEntry.otp === otp) {
            await connectMongoDB();
            const user = await User.findOne({ email });

            // Generate token
            if (!process.env.SECRET_KEY) {
                console.error("SECRET_KEY is missing in environment variables");
                return NextResponse.json(
                    { message: "Server configuration error. Please contact support." },
                    { status: 500 }
                );
            }

            const token = jwt.sign({
                    id: user._id,
                    email: user.email 
                }, process.env.SECRET_KEY, { expiresIn: '1h' });

            // Clear OTP after verification
            delete otpCache[email];

            return NextResponse.json({
                success: true,
                message: "OTP verified.",
                token: token // Send token directly in response
            }, { status: 200 });
        } else {
            return NextResponse.json({
                success: false,
                error: "Invalid OTP."
            }, { status: 400 });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}