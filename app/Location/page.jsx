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

        <div className="flex justify-center items-center mt-8">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-4 text-black">
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* ตัวอย่างพื้นที่สำหรับแผนที่ */}
              <img src="/map-placeholder.png" alt="Map" className="w-full h-full object-cover" />

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-md text-center">
                <p className="font-medium">เลือกตำแหน่งของคุณ</p>
                <button className="mt-2 bg-yellow-400 px-4 py-2 rounded-full text-white font-semibold">
                  ค้นหาตำแหน่งปัจจุบัน
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button className="bg-[#2C3E75] px-6 py-3 rounded-lg text-white font-semibold">
                ดูข้อมูลสภาพอากาศ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}