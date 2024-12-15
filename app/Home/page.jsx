"use client";

import { useRef, useEffect, useState } from "react";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { longdo, map, LongdoMap } from "../components/LongdoMap"; // Adjust path if necessary
import Dropdown from "../components/Dropdown";

{/* ---------------------------- Token and State login  ---------------------------- */}
import RegisterButton from "../components/RegisterButton";
import ProfilePopup from "../components/ProfilePopup";
import { getToken, setToken, setTokenExpiry, removeToken, removeTokenExpiry, } from "../utils/auth";
import { useRouter } from "next/navigation";
{/* ---------------------------- Token and State login  ---------------------------- */}

export default function Home() {
  const router = useRouter();
  const mapKey = "b8e921b16722e026a1b2d9e532b77706"; // API key, Should hide in .env
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // สถานะการโหลดแผนที่

  // ตรวจสอบว่า window.longdo โหลดแล้วหรือยัง
  useEffect(() => {
    if (window.longdo) {
      setIsMapLoaded(true); // เมื่อโหลดเสร็จแล้ว
    }
  }, []);

  // ฟังก์ชัน initMap
  const initMap = () => {
    // ตั้ง Base Layer เป็น NORMAL
    map.Layers.setBase(longdo.Layers.NORMAL);

    // กำหนดตำแหน่งเริ่มต้นของแผนที่ (ประเทศไทย)
    map.location({ lon: 100.5018, lat: 13.7563 }, true); // พิกัดกลางของประเทศไทย
    map.zoom(6, true); // ซูมระดับ 6

    // เพิ่ม Marker สำหรับ 6 ภาคของประเทศไทย
    const regions = [
      {
        title: "ภาคเหนือ",
        detail: "พื้นที่ภาคเหนือของประเทศไทย",
        location: { lon: 99.1508, lat: 18.7877 },
      },
      {
        title: "ภาคกลาง",
        detail: "พื้นที่ภาคกลางของประเทศไทย",
        location: { lon: 100.5018, lat: 13.7563 },
      },
      {
        name: "ภาคอีสาน",
        detail: "พื้นที่ภาคอีสานของประเทศไทย",
        location: { lon: 102.0975, lat: 15.2294 },
      },
      {
        name: "ภาคตะวันออก",
        detail: "พื้นที่ภาคตะวันออกของประเทศไทย",
        location: { lon: 101.3565, lat: 12.78 },
      },
      {
        name: "ภาคตะวันตก",
        detail: "พื้นที่ภาคตะวันตกของประเทศไทย",
        location: { lon: 99.797974, lat: 11.81136 },
      },
      {
        name: "ภาคใต้",
        detail: "พื้นที่ภาคใต้ของประเทศไทย",
        location: { lon: 100.2939, lat: 7.0083 },
      },
    ];

    // วนลูปเพิ่ม Marker สำหรับแต่ละภาค
    regions.forEach((region) => {
      map.Overlays.add(
        new longdo.Marker(region.location, {
          title: region.name,
          detail: region.detail,
          popup: { message: `${region.name}: ${region.detail}` },
        })
      );
    });
  };

  // ฟังก์ชันซูมไปที่ตำแหน่งที่เลือกจาก dropdown
  const zoomToRegion = (lat, lng) => {
    if (mapRef.current) {
      map.location({ lon: lng, lat: lat }, true); // ไปที่พิกัดที่กำหนด
      map.zoom(10, true); // ซูมไปที่พิกัดนั้น
    }
  };

{/* ---------------------------- Set Token  ---------------------------- */}
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
        <div className="flex justify-between border w-full max-[100%]">
          <div className="ml-10 w-full max-[100%]">
            <Datetime />
            <div className="mt-[1rem] mb-[1rem] w-[15rem] h-[2rem] border">
              <Dropdown zoomToRegion={zoomToRegion} />{" "}
              {/* ส่งฟังก์ชัน zoomToRegion ไปที่ Dropdown */}
            </div>
            <div className="flex border-4 border-indigo-500/100 gap-4">
              <div className="border-4 border-indigo-500/100 flex flex-wrap justify-center ml-[0rem] gap-x-[2rem] gap-y-[1rem] ">
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
              </div>
            </div>
            <div className="mt-[2rem] nb-[2rem] w-full h-[20%] border"></div>
          </div>
          <div className="flex flex-col items-end border w-[50%] mr-[1rem]">
            <h3 className="text-[2rem] mr-[1rem] font-bold">ประเทศไทย</h3>
            <LongdoMap
              id="longdo-map"
              mapKey={mapKey}
              callback={initMap}
              ref={mapRef} // ต้องให้ mapRef ทำงานใน LongdoMap
            />
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
