import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";

let otpCache = {};

async function handleStoreOtp(email, otp) {
    const expiresAt = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    otpCache[email] = { ...otpCache[email], loginOtp: { otp, expiresAt } };

    console.log(`Login OTP stored for ${email}:`, otpCache[email].loginOtp);
    return NextResponse.json({ success: true, message: "Login OTP stored successfully." }, { status: 200 });
}

async function handleVerifyOtp(email, otp) {
    // Add the client's OTP to otpCache
    otpCache[email] = { ...otpCache[email], clientOtp: otp };

    console.log(`Client OTP for ${email}:`, otpCache[email].clientOtp);

    const { loginOtp, clientOtp } = otpCache[email] || {};

    // console.log("loginOtp: ", typeof loginOtp);
    // console.log("loginOtp.otp: ", typeof loginOtp.otp);
    // console.log("clientOtp: ", typeof Number(clientOtp));

    if (loginOtp.otp === Number(clientOtp)) {

        if (Date.now() > loginOtp.expiresAt) {
            delete otpCache[email]; // Remove expired OTPs
            return NextResponse.json({ success: false, message: "OTP expired." }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY || "default_secret",
            { expiresIn: "1h" }
        );

        delete otpCache[email]; // Remove OTP after successful verification

        return NextResponse.json({
            success: true,
            message: "OTP verified successfully.",
            token: token,
        }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, message: "Invalid OTP." }, { status: 400 });
    }
}

export async function POST(req) {
    try {
        const { email, otp, action } = await req.json();

        console.log("Request Data:", { email, otp, action });
        if (!email || !otp || !action) {
            return NextResponse.json({ message: "Email, OTP, and Action are required." }, { status: 400 });
        }

        switch (action) {
            case "store":
                return await handleStoreOtp(email, otp);

            case "verify":
                return await handleVerifyOtp(email, otp);

            default:
                return NextResponse.json({ message: "Invalid action." }, { status: 400 });
        }
    } catch (error) {
        console.error("Error in verifyOtp:", error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
