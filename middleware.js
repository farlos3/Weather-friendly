import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Middleware สำหรับตรวจสอบ token
export function middleware(request) {
    // ดึง token จาก headers เช่น 'x-access-token' หรือ 'Authorization'
    const token = request.headers.get("x-access-token") || 
                  request.headers.get("authorization")?.split(" ")[1]; // Bearer token

    if (!token) {
        return NextResponse.json(
            { message: "Access denied. No token provided." },
            { status: 403 }
        );
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);

        // เพิ่มข้อมูล user ลงใน headers เพื่อนำไปใช้ใน request ถัดไป
        const requestHeaders = new Headers(request.headers);
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

// ระบุเส้นทางที่ middleware จะทำงาน
export const config = {
    matcher: ["/api/:path*"], // ใช้ middleware กับทุกเส้นทางที่เป็น API เท่านั้น
};