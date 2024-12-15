import { NextResponse } from "next/server";

export async function POST(req) {
    const { email, otp } = await req.json();

    if (!otpCache[email]) {
        return NextResponse.json({ 
            success: false, 
            error: "OTP expired or not found." }, { status: 400 });
    }

    const { otp: savedOtp, expiresAt } = otpCache[email];

    if (Date.now() > expiresAt) {
        delete otpCache[email]; // ลบ OTP ที่หมดอายุแล้ว
        return NextResponse.json({ 
            success: false, 
            error: "OTP expired." }, { status: 400 });
    }

    if (savedOtp === otp) {
        delete otpCache[email];
        return NextResponse.json({ 
            success: true, 
            message: "OTP verified." }, { status: 200 });
    } else {
        return NextResponse.json({ 
            success: false, 
            error: "Invalid OTP." }, { status: 400 });
    }
}
