"use client";

import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/Backend/registerPage/login");
  };

  const handleSignup = () => {
    router.push("/Backend/registerPage/signup");
  };

  return (
    <div className="flex space-x-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}