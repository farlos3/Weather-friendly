import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        await connectMongoDB();

        const user = await User.findOne({ email });
        const modifiedPassword = '123' + password + "456";
        const isPasswordValid = user ? await bcryptjs.compare(modifiedPassword, user.password) : false;
        if (!user || !isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        console.log("Login successful!✅")

        return NextResponse.json({ message: "Login successful." }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "An error occurred during login. Please try again." }, { status: 500 });
    }
}