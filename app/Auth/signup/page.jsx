"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterPage() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const redirectTo = searchParams.get('redirect') || '/';

  async function handleSubmit(event) {
    event.preventDefault();

    if (password != confirmPassword) {
      setError("Password do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }

    try {
      const resCheckUser = await fetch("http://localhost:3000/backend/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resCheckUser.json();
      if (user) {
        setError("User already exists!");
        return;
      }

      const res = await fetch("http://localhost:3000/backend/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = event.target;
        setError("");
        setSuccess("User registeration successfully!✅");
        setTimeout(() => {
          router.push(redirectTo);
        }, 500);
        form.reset();
      } else {
        console.log("User registration failed.💥");
      }
    } catch (error) {
      setError("Error during registration. Please try again.");
      console.log("Error during registration: ", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Your Account
          </h3>
          <hr className="mb-6 border-gray-200" />
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 border border-red-600 rounded-lg px-3 p-2 flex items-center space-x-3 text-white">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-500 border border-green-600 rounded-lg px-3 p-2 flex items-center space-x-3 text-white">
                {success}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                onChange={(event) => setName(event.target.value)}
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                type="text"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={(event) => setEmail(event.target.value)}
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={(event) => setPassword(event.target.value)}
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                onChange={(event) => setConfirmPassword(event.target.value)}
                id="confirm-password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                type="password"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              สร้างบัญชี
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              มีบัญชีอยู่แล้ว?{" "}
              <Link href="./login"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline">ลงชื่อเข้าใช้ที่นี่
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
