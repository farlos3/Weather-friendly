"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function RegisterPage() {

  const userRef = useRef();
  // const errRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

  const redirectTo = searchParams.get('striaght') || '/'; // หน้า default กรณีไม่มี redirect

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setError('');
  }, [email, password])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/AuthRoutes/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // const data = await res.json();
        setError('');
        setSuccess("Login successful!");
        // console.log(data);
        setTimeout(() => {
          router.push(redirectTo);
        }, 500);
        setEmail('');
        setPassword('');
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (error) {
      setError("Error during login. Please try again.");
      console.log("Error during login: ", error);
    }
  }

  // async function handleGoogleLogin() {
  //   try {
  //     // Redirect ผู้ใช้ไปยัง Endpoint ของ Google OAuth
  //     window.location.href = `${API_BASE_URL}/AuthRoutes/api/auth/google`;
  //   } catch (error) {
  //     setError("Error during Google login. Please try again.");
  //   }
  // }  
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 border border-red-600 rounded-lg px-3 py-2 mb-4 text-white">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500 border border-green-600 rounded-lg px-3 py-2 mb-4 text-white">
              {success}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              id="email"
              ref={userRef}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              placeholder="Enter password"
            />
          </div>
          <div className="space-y-4">
            {/* <button
              onClick={handleGoogleLogin}
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login with Google
            </button> */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <p>
              ไม่มีบัญชีผู้ใช้?{" "}
              <Link href="./signup" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700">ลงทะเบียนที่นี่</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}