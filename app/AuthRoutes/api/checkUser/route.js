// checkUser/route.js

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";

export async function POST(request) {
    try {
        const { email } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Check if the user exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ user: existingUser }, { status: 200 });
        } else {
            return NextResponse.json({ user: null }, { status: 200 });
        }
    } catch (error) {
        console.error("Error during user check:", error);
        return NextResponse.json({ message: "An error occurred during user check." }, { status: 500 });
    }
}
