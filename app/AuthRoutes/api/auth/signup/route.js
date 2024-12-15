import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/app/models/user";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Check if the email already exists
        await connectMongoDB();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already registered. Please try a different email." }, { status: 400 });
        }

        const modifiedPassword = '123' + password + "456";
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(modifiedPassword, salt);

        // Create the new user
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.SECRET_KEY, 
            { 
                expiresIn: '1h' 
            }
        );

        // Save user token
        newUser.token = token;

        console.log('Name: ', name);
        console.log('Email: ', email);
        console.log('Password: ', hashedPassword);

        // Return user details with the response
        return NextResponse.json({
            message: "User registered.✅",
            User: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: token
            }
        }, { status: 201 });
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json({ message: "An error occurred during registration. Please try again." }, { status: 500 });
    }
}