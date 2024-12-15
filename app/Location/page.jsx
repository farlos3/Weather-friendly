"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Footer from "../components/Footer";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css";
import React, { useState, useEffect } from "react";

export default function Page() {
  const mapKey = "78e3e19c34fc8b7af0e4e03ed3b97960"; // แทนที่ด้วย API Key ที่ได้จาก Longdo
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // ฟังก์ชันในการตั้งค่าแผนที่
  const initMap = () => {
    // ตรวจสอบว่า longdo และ map มีการโหลดหรือไม่
    if (window.longdo && window.longdo.Map) {
      const map = new window.longdo.Map({
        placeholder: document.getElementById("longdo-map"), // หา id ของ div ที่จะแสดงแผนที่
        
      });

      // ตัวอย่างการตั้งค่าเริ่มต้นของแผนที่
      map.Layers.setBase(longdo.Layers.NORMAL);
      map.location({ lon: 100.5018, lat: 13.7563 }, true); // ตั้งค่าตำแหน่งเริ่มต้น
      map.zoom(6, true); // ซูมแผนที่
      setIsMapLoaded(true); // ตั้งค่าแผนที่ว่าโหลดเสร็จแล้ว
    }
  };

  // ใช้ useEffect ในการโหลด script สำหรับ Longdo
  useEffect(() => {
    // ตรวจสอบว่า script ถูกเพิ่มไปแล้วหรือยัง
    const existingScript = document.getElementById("longdoMapScript");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://api.longdo.com/map/?key=${mapKey}`;
      script.id = "longdoMapScript";
      document.body.appendChild(script);

      script.onload = () => {
        // เรียกใช้ฟังก์ชัน initMap หลังจาก script โหลดเสร็จ
        initMap();
      };
    } else {
      // ถ้า script มีอยู่แล้ว
      initMap();
    }
  }, [mapKey]); // เพิ่ม mapKey เป็น dependency เพื่อให้ useEffect ทำงานเมื่อคีย์เปลี่ยน

  return (
    <main className="flex flex-col h-screen w-full bg-gradient-to-bl from-[#0D1E39] via-[#112F5E] to-[#0D1E39] text-white">
      <div className="flex justify-between border items-center">
        <Headlogo />
        <RegisterButton />
      </div>

      <section className="flex h-full w-full max-[100%]">
        <Navbar />
        <div className="inline ml-10 justify-between border w-full">
          <h1 className="h-[9%] flex items-center w-full text-5xl font-semibold border">
            ตำแหน่งของฉัน
          </h1>
          <p className="text-3xl text-lg h-fit h-[5%] flex items-center ">
            เลือกตำแหน่งของคุณ
            เพื่อรับข้อมูลสภาพอากาศที่แม่นยำและคำแนะนำด้านสุขภาพในพื้นที่ของคุณ
          </p>

          <section className="flex justify-center items-center mt-8">
            <section className="rounded-lg w-11/12 max-w-4xl p-4 text-black">
              <div className="border-2 border-4 border-black h-96 rounded-lg">
                {/* แผนที่ Longdo */}
                <div id="longdo-map" className="h-full w-full"></div>
              </div>

              <section className="flex justify-center mt-4">
                <button className="flex items-center bg-[#0A1931] px-4 py-3 rounded-full text-white font-semibold">
                  <div className="flex items-center justify-center bg-white rounded-full h-8 w-8 mr-2">
                    <img
                      src="/img/location Icon.png"
                      alt="icon_location"
                      className="h-4 w-4"
                    />
                  </div>
                  ตำแหน่งปัจจุบัน
                </button>
                {/* กดปุ่มแล้วจะมีป้อปอัพล้อคอินขึ้น และต้องสร้างอีกหน้าสำหรับล้อคอินแล้ว */}
              </section>
            </section>
          </section>
        </div>
      </section>
      <footer className="mt-auto text-black">
        <Footer />
      </footer>
    </main>
  );
}
