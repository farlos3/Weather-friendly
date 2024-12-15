import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";

export async function POST(request) {
    try {
        await connectMongoDB();
        const { email } = await request.json();
        const user = await User.findOne({ email }).select("_id");
        console.log("User: ", user);

        return NextResponse.json({ user });

    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json(
            { message: "An error occurred while processing the request.", error: error.message },
            { status: 500 }
        );
    }
}