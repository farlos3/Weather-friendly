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
        await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign(
            { id: User._id, email: User.email },
            process.env.SECRET_KEY, 
            { 
                expiresIn: '1h' 
            });

        // save user token
        User.token = token;

        console.log('Name: ', name);
        console.log('Email: ', email);
        console.log('Password: ', hashedPassword, '\n');

        // Return user details with the response
        return NextResponse.json({
            message: "User registered.✅",
            User: {
                id: User._id,
                name: User.name,
                email: User.email,
                // password : User.hashedPassword
                token: token
                }
            }, { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ message: "An error occurred during registration. Please try again." }, { status: 500 });
    }
}