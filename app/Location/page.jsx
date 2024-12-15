"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Footer from "../components/Footer";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css"; 

export default function Page() {
  return (
    <main className="flex min-h-screen bg-gradient-to-bl from-[#0D1E39] via-[#112F5E] to-[#0D1E39] text-white">
      <section className="flex flex-col w-full ">
        <header>
          <Headlogo />
          <Navbar />
        </header>
        <div className="absolute top-0 right-0 p-4">
          <RegisterButton />
        </div>
        <section className="text-start ml-24 pl-12"> 
          <h1 className="text-5xl font-semibold">ตำแหน่งของฉัน</h1>
            <p className="text-3xl text-lg pt-4 ">
              เลือกตำแหน่งของคุณ เพื่อรับข้อมูลสภาพอากาศที่แม่นยำและคำแนะนำด้านสุขภาพในพื้นที่ของคุณ
            </p>
        </section>
        <section className="flex justify-center items-center mt-8">
          <section className="rounded-lg w-11/12 max-w-4xl p-4 text-black">
            <div className="border-2 border-4 border border-black h-96 rounded-lg overflow-hidden">

              {/* แผนที่ */}
            
            </div>

            <section className="flex justify-center mt-4">
               <button className="flex items-center bg-[#0A1931] px-4 py-3 rounded-full text-white font-semibold">
                <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 mr-2">
                  <img src="/img/location Icon.png" alt="icon_location" className="h-4 w-4" />
                </div>
                ตำแหน่งปัจจุบัน
              </button>
              {/* กดปุ่มแล้วจะมีป้อปอัพล้อคอินขึ้น และต้องสร้างอีกหน้าสำหรับล้อคอินแล้ว */}
            </section>
          </section>
        </section>
        <footer className="mt-auto text-black">
          <Footer />
        </footer>
      </section>
    </main>
  );
}
