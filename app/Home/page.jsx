"use client";

import { useState, useEffect } from "react";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterButton from "../components/RegisterButton";

export default function Home() {
  // สถานะการล็อกอิน
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    localStorage.setItem('token_expiry', new Date().getTime() + 3600000); 
    if (token) {
      setIsLoggedIn(true);
    }
    console.log("token: ", token)
  }, []);

  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex flex-col"
        style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
      >
        <header>
          <Headlogo />
          <Navbar />
        </header>
        <div className="absolute top-0 right-0 p-4">
          <RegisterButton />
        </div>
        <Datetime />
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <div className="w-60"></div>
          </div>
        </div>
        <div className="py-8">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:gid-cols-4 gap-8">
              {/* today weather */}
              <div></div>
            </div>
          </div>
        </div>

        <div className="grid grid-row-2 ">
          <h3 className="text-xl absolute top-7 right-2 font-bold">
            {isLoggedIn ? "thailand" : "ประเทศไทย"}
          </h3>
          <div className="absolute top-20 right-2 w-[500px] h-full max-h-[700px] border"></div>
        </div>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}