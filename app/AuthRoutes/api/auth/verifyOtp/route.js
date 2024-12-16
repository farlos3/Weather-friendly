import { NextResponse } from "next/server";

let otpCache = {}; // Temporary OTP storage

export async function POST(req) {
    try {
        const { email, otp } = await req.json(); // Get email and OTP from request
        console.log("\nRequest Data:", { email, otp });

        // Log OTP cache contents before retrieval
        console.log("OTP Cache before retrieval:", otpCache);

        const cacheEntry = otpCache[email.trim().toLowerCase()];
        if (!cacheEntry) {
            console.log(`OTP not found for email: ${email}\n`);
            return NextResponse.json({ 
                success: false, 
                error: "OTP expired or not found." 
            }, { status: 400 });
        }

        const { otp: savedOtp, expiresAt } = cacheEntry;
        console.log(`Retrieved OTP for ${email}:`, { savedOtp, expiresAt });

        if (Date.now() > expiresAt) {
            delete otpCache[email.trim().toLowerCase()]; // Delete expired OTP
            console.log(`OTP expired for email: ${email}`);
            return NextResponse.json({ 
                success: false, 
                error: "OTP expired." 
            }, { status: 400 });
        }

        if (savedOtp === otp) {
            delete otpCache[email.trim().toLowerCase()]; // Delete OTP after verification
            console.log(`OTP verified for email: ${email}`);
            return NextResponse.json({ 
                success: true, 
                message: "OTP verified." 
            }, { status: 200 });
        } else {
            console.log(`Invalid OTP for email: ${email}`);
            return NextResponse.json({ 
                success: false, 
                error: "Invalid OTP." 
            }, { status: 400 });
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}