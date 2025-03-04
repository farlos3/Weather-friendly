"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Info from "/public/img/Info_alt_light.png";
import Home from "/public/img/Frame 55.png";
import HomeHover from "/public/img/Frame 58.png";
import Location from "/public/img/Icon2.png";
import Locationhover from "/public/img/Icon.png";
import Rainfall from "/public/img/Drizzle.png";
import Rainfallhover from "/public/img/Drizzledark.png";
import AirQ from "/public/img/blizzard2.png";
import AirQhover from "/public/img/blizzard.png";
import Health from "/public/img/Vector.png";
import Healthhover from "/public/img/Vector2.png";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [selectedMenu, setSelectedMenu] = useState(""); // Tracks the selected menu
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // Render nothing until `time` is available

  const menuItems = [
    {
      key: "home",
      label: "หน้าหลัก",
      image: Home,
      hoverImage: HomeHover,
      onClick: () => router.push("/"),
    },
    {
      key: "rainfall",
      label: "ปริมาณน้ำฝน",
      image: Rainfall,
      hoverImage: Rainfallhover,
      onClick: () => router.push("/Rainfall"),
    },
    {
      key: "airQ",
      label: "คุณภาพอากาศ",
      image: AirQ,
      hoverImage: AirQhover,
      onClick: () => router.push("/Air"),
    },
    {
      key: "health",
      label: "สุขภาพ",
      image: Health,
      hoverImage: Healthhover,
      onClick: () => {
        const token = localStorage.getItem("token");
        if (token) {
          router.push("/Health");
        } else {
          alert("กรุณาเข้าสู่ระบบก่อนเข้าถึงหน้า สุขภาพ");
          router.push("/Auth/login");
        }
      },
    },
  ];

  return (
    <div className="w-max flex items-center justify-center">
      <nav className="text-white bg-[#0A1931] px-2 rounded-[2rem] flex flex-col justify-center items-center shadow-[0px_0px_10px_4px_#11121374]">
        {menuItems.map((item) => (
          <div key={item.key} className="flex flex-col items-center mt-[2rem]">
            <button
              className={`flex flex-col items-center justify-center w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out ${
                selectedMenu === item.key
                  ? "bg-white text-[#0A1931] shadow-[0px_0px_15px_2px_#246ada42]"
                  : "text-white hover:bg-white hover:text-[#0A1931] hover:shadow-[0px_0px_15px_2px_#246ada42] hover:opacity-80"
              }`}
              onClick={() => {
                setSelectedMenu(item.key);
                item.onClick();
              }}
              onMouseEnter={() => setSelectedMenu(item.key)}
              onMouseLeave={() => {
                if (selectedMenu !== item.key) setSelectedMenu("");
              }}
            >
              <Image
                src={selectedMenu === item.key ? item.hoverImage : item.image}
                alt={item.label}
                className="w-[2rem] h-[2rem] object-contain"
              />
            </button>
            <h4 className="flex flex-col items-center w-[5rem] text-center text-[10pt] mt-1">{item.label}</h4>
          </div>
        ))}
        <button className="rounded-full border-none p-[5px] m-[20px_0_5px_0] py-6 px-2">
          <Image
            src={Info}
            alt="Information"
            className="w-[2rem] h-[2rem] mb-[2rem] object-contain flex items-center"
          />
        </button>
      </nav>
    </div>
  );
}
