import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;

    if (path !== "/AuthRoutes/api/auth/login") {
        // Extract the token from headers
        const token = 
            request.headers.get("x-access-token") || 
            request.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            console.error("Access attempt without token.");
            return NextResponse.json(
                { message: "Access denied. No token provided." },
                { status: 403 }
            );
        }

        try {
            // Verify the token
            const verified = jwt.verify(token, process.env.SECRET_KEY);

            // Clone the existing headers
            const requestHeaders = new Headers(request.headers);

            // Add user data to headers
            requestHeaders.set("x-user", JSON.stringify(verified));

            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch (error) {
            console.error("Token verification failed:", error.message);

            return NextResponse.json(
                { message: "Invalid or expired token." },
                { status: 401 }
            );
        }
    }

    if (path === "/AuthRoutes/api/auth/login") {
        const otpVerified = request.headers.get("x-otp-verified");
        
        if (otpVerified !== "true") {
            console.warn("OTP verification failed during login.");
            return NextResponse.json(
                { message: "OTP verification required." },
                { status: 401 }
            );
        }
    }

    // Allow request to continue
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ["/api/:path*"], // Middleware for all API routes
};
