"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Footer from "../components/Footer";
import "/app/globals.css";

{/* ---------------------------- Token and State login  ---------------------------- */}
import { useEffect, useState } from "react";
import RegisterButton from "../components/RegisterButton";
import ProfilePopup from "../components/ProfilePopup";
import { getToken, setToken, setTokenExpiry, removeToken, removeTokenExpiry, } from "../utils/auth";
import { useRouter } from "next/navigation";
{/* ---------------------------- Token and State login  ---------------------------- */}

export default function page() {
  {/* ---------------------------- Set Token  ---------------------------- */}
  const router = useRouter();
  const [isLoginPopupVisible, setIsLoginPopupVisible] = useState(false);

  // State login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      setTokenExpiry();
    }
    console.log("token: ", token);
  }, []);

  const handleLogout = () => {
    removeToken();
    console.log("After logout, \ntoken:", getToken());

    setIsLoggedIn(false); // อัปเดตสถานะเป็น Logged out
    router.push("/");
  };

  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  const showLoginPopup = () => {
    setIsLoginPopupVisible(true);
  };

  const closeLoginPopup = () => {
    setIsLoginPopupVisible(false);
  };

  
{/* ---------------------------- Set Token  ---------------------------- */}

const mapKey = process.env.NEXT_PUBLIC_LONGDO_MAP_KEY; // API Key จาก Longdo
const [isMapLoaded, setIsMapLoaded] = useState(false);

// ฟังก์ชันในการตั้งค่าแผนที่
const initMap = () => {
  if (window.longdo && window.longdo.Map) {
    const map = new window.longdo.Map({
      placeholder: document.getElementById("longdo-map"),
    });

    // ตั้งค่าพื้นฐาน
    map.Layers.setBase(window.longdo.Layers.NORMAL);
    map.location({ lon: 100.5018, lat: 13.7563 }, true); // ตำแหน่งเริ่มต้น
    map.zoom(6, true); // ระดับการซูม
    setIsMapLoaded(true);
  }
};

// โหลด Longdo Map Script
useEffect(() => {
  const existingScript = document.getElementById("longdoMapScript");

  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://api.longdo.com/map/?key=${mapKey}`;
    script.id = "longdoMapScript";
    document.body.appendChild(script);

    script.onload = initMap;
  } else {
    initMap();
  }
}, [mapKey]);


  return (
    <main className="flex flex-col h-screen h-full w-full bg-gradient-to-bl from-[#0D1E39] via-[#112F5E] to-[#0D1E39] text-white">
      <div className="flex justify-between border items-center">
        <Headlogo />
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 relative">
            <p>ยินดีต้อนรับ</p>
            <img
              src="/img/Account-Icon.png"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={handleProfileClick}
            />
            <div className="absolute top-full right-0">
              <ProfilePopup
                isVisible={isProfilePopupVisible}
                onClose={() => setIsProfilePopupVisible(false)}
                onLogout={handleLogout} // ส่งฟังก์ชัน handleLogout ไปที่ ProfilePopup
              />
            </div>
          </div>
        ) : (
          <RegisterButton />
        )}
      </div>
      {/* ---------------------------- Token and State login  ---------------------------- */}

      <section className="flex h-full w-full max-[100%]">
        <Navbar />
        <div className="inline ml-10 justify-between border w-full">
          <h1 className="h-[9%] flex items-center w-full text-5xl font-semibold border">
            ตำแหน่งของฉัน
          </h1>
          <p className="text-lg h-fit h-[5%] flex items-center">
            เลือกตำแหน่งของคุณ
            เพื่อรับข้อมูลสภาพอากาศที่แม่นยำและคำแนะนำด้านสุขภาพในพื้นที่ของคุณ
          </p>

          <section className="flex justify-center items-center mt-8">
            <section className="rounded-lg w-11/12 max-w-4xl p-4 text-black">
              <div className="border-2 border-black h-96 rounded-lg">
                {/* แสดงแผนที่ Longdo */}
                <div id="longdo-map" className="h-full w-full"></div>
              </div>

              <section className="flex justify-center mt-4">
                <button
                  className="flex items-center bg-[#0A1931] px-4 py-3 rounded-full text-white font-semibold hover:bg-[#112F5E] transition"
                  onClick={() => {
                    if (!isLoggedIn) {
                      showLoginPopup(); // แสดงป๊อปอัพหากยังไม่ได้ล็อกอิน
                    } else {
                      alert("กำลังหาตำแหน่งปัจจุบัน...");
                    }
                  }}
                >
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
            </section>
          </section>
        </div>
      </section>
      {isLoginPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center w-96">
            <h2 className="text-xl text-gray-700 font-semibold mb-4">
              โปรดเข้าสู่ระบบ
            </h2>
            <p className="text-gray-700 mb-6">
              เพื่อทราบตำแหน่งของคุณ กรุณาเข้าสู่ระบบ
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
              onClick={closeLoginPopup}
            >
              ปิด
            </button>
          </div>
        </div>
      )}
      <footer className="mt-auto text-black">
        <Footer />
      </footer>
    </main>
  );
}
