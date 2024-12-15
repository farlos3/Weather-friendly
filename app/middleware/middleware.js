// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export const middleware = (request) => {
//     // ดึง token จาก cookies
//     const token = request.cookies.get("token");

//     // ตรวจสอบและแสดงค่าของ token ใน console
//     console.log("Token from cookies:", token);

//     if (!token) {
//         // ไม่มี token -> redirect ไปหน้า /login
//         return NextResponse.redirect(new URL("/login", request.url));
//     }

//     try {
//         // ตรวจสอบ token
//         jwt.verify(token, process.env.SECRET_KEY);
//         return NextResponse.next();
//     } catch (error) {
//         console.error("Invalid token:", error.message);
//         return NextResponse.redirect(new URL("/login", request.url));
//     }
// };

// export const config = {
//     matcher: '/Home/*', // ใช้ middleware กับหน้า Home หรือที่ path ที่ต้องการ
// };