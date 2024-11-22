"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Footer from "../components/Footer";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css";

export default function Page() {
  return (
    <main className="bg-gradient-to-bl from-[#0D1E39] via-[#112F5E] to-[#0D1E39] text-white">
      <div className="flex justify-between border items-center">
        <Headlogo />
        <RegisterButton />
      </div>
      <div className="flex">
         <Navbar />
         <section className="flex flex-col w-full">
        {/* Title Section */}
        <section className="text-start px-6 md:px-12 lg:px-24">
          <h1 className="text-3xl md:text-5xl font-semibold">ตำแหน่งของฉัน</h1>
          <p className="text-base md:text-lg pt-4">
            เลือกตำแหน่งของคุณ
            เพื่อรับข้อมูลสภาพอากาศที่แม่นยำและคำแนะนำด้านสุขภาพในพื้นที่ของคุณ
          </p>
        </section>

        {/* Map Section */}
        <section className="flex justify-center items-center mt-8">
          <div className="rounded-lg w-11/12 max-w-4xl p-4 text-black">
            <div className="border-4 border-black h-[24rem] md:h-[30rem] rounded-lg overflow-hidden bg-gray-300">
              {/* Placeholder สำหรับแผนที่ */}
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                <p>แผนที่กำลังโหลด...</p>
              </div>
            </div>

            {/* Current Location Button */}
            <section className="flex justify-center mt-6">
              <button className="flex items-center bg-[#0A1931] px-6 py-3 rounded-full text-white font-semibold shadow-md hover:bg-[#123a65]">
                <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 mr-2">
                  <img
                    src="/img/location Icon.png"
                    alt="icon_location"
                    className="h-4 w-4"
                  />
                </div>
                ตำแหน่งปัจจุบัน
              </button>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto text-black">
          <Footer />
        </footer>
      </section>
      </div>
      
    </main>
  );
}
