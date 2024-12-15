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

export default function Page() {

{/* ---------------------------- Set Token  ---------------------------- */}
  const router = useRouter();

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
{/* ---------------------------- Set Token  ---------------------------- */}

  return (
    <main className="flex flex-col h-screen h-full w-full bg-gradient-to-bl from-[#0D1E39] via-[#112F5E] to-[#0D1E39] text-white">

{/* ---------------------------- Token and State login  ---------------------------- */}
      <div className="flex justify-between items-center p-4 border-b">
        <Headlogo />
        {isLoggedIn ? (
          <div className="flex items-center space-x-2 relative">
            <p>Welcome</p>
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

      <section className="flex h-full w-full  max-[100%] ">
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
              <div className="border-2 border-4 border border-black h-96 rounded-lg">
                {/* แผนที่ */}
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
