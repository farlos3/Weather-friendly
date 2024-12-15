import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
        }

        await connectMongoDB();

        const user = await User.findOne({ email });
        const modifiedPassword = '123' + password + "456"; // แปลงรหัสผ่านโดยเพิ่ม prefix และ suffix
        // const isPasswordValid = user ? await bcryptjs.compare(modifiedPassword, user.password) : false;
        // if (!user || !isPasswordValid) {
        //     return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        // }

        // save user token
        user.token = token;

        // if (!process.env.SECRET_KEY) {
        //     console.error("SECRET_KEY is missing in environment variables");
        //     return NextResponse.json(
        //         { message: "Server configuration error. Please contact support." },
        //         { status: 500 }
        //     );
        // }

        if (user && (await bcryptjs.compare(modifiedPassword, user.password))) {
            const token = jwt.sign(
                { id: user._id, email: user.email },
                process.env.SECRET_KEY, 
                { expiresIn: '1h' });

            console.log("Generated JWT Token:", token);

            user.token = token;

            console.log("Login successful!✅")
            console.log(`User logged in: ${user.email}\n`);

            return NextResponse.json({
                message: "Login successful!✅",
                User: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    token: token
                    }
                }, { status: 201 }
            );
        }

    } catch (error) {
        console.error("Error during login:", error.message);
        console.error("Login error:", error);

        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}