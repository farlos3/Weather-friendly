import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // ตรวจสอบ JWT Token เฉพาะสำหรับ API อื่นที่ไม่ใช่ Login
    if (path !== "/AuthRoutes/api/auth/login") {
        const token = request.headers.get("x-access-token") || 
                      request.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { message: "Access denied. No token provided." },
                { status: 403 }
            );
        }

        try {
            const verified = jwt.verify(token, process.env.SECRET_KEY);
            const requestHeaders = new Headers(request.headers);

            // เพิ่มข้อมูล user ลงใน Headers
            requestHeaders.set("x-user", JSON.stringify(verified));

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            console.error("Token verification failed:", error);
            return NextResponse.json(
                { message: "Invalid or expired token." },
                { status: 401 }
            );
        }
    }

    // ตรวจสอบ OTP เฉพาะสำหรับ Login
    if (path === "/AuthRoutes/api/auth/login") {
        const otpVerified = request.headers.get("x-otp-verified");
        if (otpVerified !== "true") {
            return NextResponse.json(
                { message: "OTP verification required." },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

// ระบุเส้นทางที่ middleware จะทำงาน
export const config = {
    matcher: ["/api/:path*"], // ใช้ middleware กับทุกเส้นทางที่เป็น API เท่านั้น
};