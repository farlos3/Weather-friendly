"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const userRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [otp, setOtp] = useState(""); // สำหรับเก็บ OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // เช็คว่า OTP ถูกส่งแล้วหรือยัง

  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [email, password]);

  // Step 1: Handle Login and Send OTP
  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await fetch("/AuthRoutes/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setIsOtpSent(true); // OTP ถูกส่งแล้ว
        setSuccess("OTP has been sent to your email.");
        setError("");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Login failed.");
      }
    } catch (error) {
      setError("Error during login. Please try again.");
      console.log("Error during login: ", error);
    }
  }

  // Step 2: Verify OTP
  async function handleVerifyOtp(event) {
    event.preventDefault();

    try {
      const res = await fetch("/AuthRoutes/api/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess("Login successful!");
        setError("");
        localStorage.setItem("token", data.User.token);
        localStorage.setItem("token_expiry", new Date().getTime() + 3600000);
        setTimeout(() => {
          router.push(redirectTo);
        }, 500);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Invalid OTP.");
      }
    } catch (error) {
      setError("Error during OTP verification. Please try again.");
      console.log("Error during OTP verification: ", error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={isOtpSent ? handleVerifyOtp : handleLogin}>
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
          {!isOtpSent && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
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
            </>
          )}
          {isOtpSent && (
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                onChange={(event) => setOtp(event.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="otp"
                placeholder="Enter OTP"
              />
            </div>
          )}
          <div className="space-y-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {isOtpSent ? "Verify OTP" : "Login"}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p>
              ไม่มีบัญชีผู้ใช้?{" "}
              <Link href="./signup" legacyBehavior>
                <a className="text-blue-500 hover:text-blue-700">
                  ลงทะเบียนที่นี่
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
