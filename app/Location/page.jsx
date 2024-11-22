"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Footer from "../components/Footer";
import "/app/globals.css"; 

export default function page() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-[#0A144A] to-[#1A294E] text-white">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col w-full">
        
        <header className="flex items-center justify-between p-4">
          <Headlogo />
        </header>

        
        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">ตำแหน่งของฉัน</h1>
          <p className="text-sm mt-2">
            เลือกตำแหน่งของคุณ เพื่อรับข้อมูลสภาพอากาศที่แม่นยำและคำแนะนำด้านสุขภาพในพื้นที่ของคุณ
          </p>
        </div>

        
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}