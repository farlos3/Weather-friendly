import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from 'bcryptjs';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        const modifiedPassword = '123' + password + "456";
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(modifiedPassword, salt);

        await connectMongoDB();
        await User.create(({ name, email, password: hashedPassword }));

        console.log('Name: ', name);
        console.log('Email: ', email);
        console.log('Password: ', hashedPassword);

        return NextResponse.json({ message: "User registered.✅"}, { status: 201 });
        
    } catch(error) {
        return NextResponse.json({ message: "An error occurred during registration. Please try again."}, { status: 500 });
    }
}