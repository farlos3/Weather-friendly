"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
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
      style={{ backgroundImage: "url('/img/AirBackground.gif')" }}>

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

      <section className=" border flex h-full w-full max-[100%]">
        <Navbar />
        <section className="flex-1 border w-full max-[100%] mx-6 ">
          <header className="border flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">คุณภาพอากาศ</h1>
              <p className="text-lg font-bold">มจธ, กรุงเทพมหานคร</p>
              <p>อา. 13 ตุลาคม 2567 8:00 น.</p>
            </div>
          </header>

          {/* Dropdowns */}
          <section className="border flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>PM 2.5</option>
                <option>PM 10</option>
                <option>Ozone</option>
              </select>
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>รายชั่วโมง</option>
                <option>รายวัน</option>
              </select>
            </div>
          </section>

          {/* Map */}
          <section className="mt-6">
            <div className="border rounded-lg h-60 mb-4 rounded-lg bg-gray-200">
              <img
                src="/map-placeholder.png"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </section>

        <div className=" border h-full max-[100%] mx-6 w-1/3 p-4 space-y-4 ">
          {/* Legend */}
          <div className="flex items-center justify-between p-4">
            <p>ดีมาก</p>
            <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-full"></div>
            <p>แย่</p>
          </div>

          {/* Search Bar and Dropdown */}

          {/* AQI List */}
          <div className="bg-yellow-300 rounded-lg border h-full w-full p-4 space-y-4 ">
            {["กรุงเทพมหานคร", "สมุทรปราการ"].map((location, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white p-3 rounded-md"
              >
                <div>
                  <p className="font-bold text-lg">{location}</p>
                  <p className="text-sm">PM 2.5: 35 μg/m³</p>
                  <p className="text-sm">13 ต.ค. 2024 22:00</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl">70</p>
                  <p className="text-sm">AQI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
