"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}>
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

      <div className="flex h-full max-[100%]">
        <Navbar />

        <div className="inline w-full border-4 border-blue-500/75">
          <div className="flex ml-10 h-[30%] border-4 border-red-500/75">
            <div className="w-[30%] border-4 border-black">
              <h1 className="text-[2.5rem] font-bold">ปริมาณฝน</h1>
              <Datetime />
              <p className="text-[1.5rem]">ภาคกลาง</p>
            </div>

            <div className="border-4 border-indigo-500/75 w-[70%] h-full max-[100%]">
              ใส่ข้อมูลปริมาณฝนตรงนี้
            </div>
          </div>
          <div className=" flex items-center ml-[2.5rem] h-[70%] gap-x-4 border-4 border-red-500">
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">
              ปริมาณฝนรายชั่วโมง
            </div>
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">
              ปริมาณฝนรายชั่วโมง
            </div>
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">
              ปริมาณฝนรายชั่วโมง
            </div>
            <div className="w-full h-[70%] border-4 border-yellow-500">
              กราฟฝนรายชั่วโมง
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
