import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        const modifiedPassword = '123' + password + "456";
        const isPasswordValid = user ? await bcryptjs.compare(modifiedPassword, user.password) : false;
        if (!user || !isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.SECRET_KEY, { expiresIn: '1h' });
        console.log("Generated JWT Token:", token);

        if (!process.env.SECRET_KEY) {
            console.error("SECRET_KEY is missing in environment variables");
            return NextResponse.json(
                { message: "Server configuration error. Please contact support." },
                { status: 500 }
            );
        }

        const response = NextResponse.json({ 
            message: "Login successful!✅",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });

        // เก็บ token ใน Cookie แบบ Secure HTTP-only
        // Setting cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" || false,
            sameSite: "strict", 
            maxAge: 3600,
            path: '/'
        });

        console.log("Login successful!✅")
        console.log(`User logged in: ${user.email}\n`);

        return response;

    } catch (error) {
        console.error("Error during login:", error.message);
        console.error("Login error:", error);

        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}