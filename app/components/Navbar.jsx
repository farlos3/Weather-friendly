"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function Navbar() {
  const router = useRouter();

  const images = {
    home: { default: Home, hover: HomeHover },
    location: { default: Location, hover: Locationhover },
    rainfall: { default: Rainfall, hover: Rainfallhover },
    airQ: { default: AirQ, hover: AirQhover },
    health: { default: Health, hover: Healthhover },
  };

  const [currentImages, setCurrentImages] = useState({
    home: images.home.default,
    location: images.location.default,
    rainfall: images.rainfall.default,
    airQ: images.airQ.default,
    health: images.health.default,
  });

  const handleMouseEnter = (key) => {
    setCurrentImages((prev) => ({ ...prev, [key]: images[key].hover }));
  };

  const handleMouseLeave = (key) => {
    setCurrentImages((prev) => ({ ...prev, [key]: images[key].default }));
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <nav className="text-white absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#0A1931] w-max h-max px-2 rounded-[25px] flex flex-col items-center shadow-[0px_0px_10px_4px_#11121374] justify-center">
      <button
        onMouseEnter={() => handleMouseEnter("home")}
        onMouseLeave={() => handleMouseLeave("home")}
        onClick={() => handleNavigation("/")}
        className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
      >
        <Image src={currentImages.home} alt="Home" width={40} height={40} />
      </button>
      <h4 className="text-[10pt] m-[10px_0_5px_0]">หน้าหลัก</h4>

      <button
        onMouseEnter={() => handleMouseEnter("location")}
        onMouseLeave={() => handleMouseLeave("location")}
        onClick={() => handleNavigation("/Location")}
        className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
      >
        <Image src={currentImages.location} alt="Location" width={40} height={40} />
      </button>
      <h4 className="text-[10pt] m-[10px_0_5px_0]">สถานที่</h4>

      <button
        onMouseEnter={() => handleMouseEnter("rainfall")}
        onMouseLeave={() => handleMouseLeave("rainfall")}
        onClick={() => handleNavigation("/Rainfall")}
        className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
      >
        <Image src={currentImages.rainfall} alt="Rainfall" width={40} height={40} />
      </button>
      <h4 className="text-[10pt] m-[10px_0_5px_0]">ปริมาณน้ำฝน</h4>

      <button
        onMouseEnter={() => handleMouseEnter("airQ")}
        onMouseLeave={() => handleMouseLeave("airQ")}
        onClick={() => handleNavigation("/Air")}
        className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
      >
        <Image src={currentImages.airQ} alt="Air Quality" width={40} height={40} />
      </button>
      <h4 className="text-[10pt] m-[10px_0_5px_0]">คุณภาพอากาศ</h4>

      <button
        onMouseEnter={() => handleMouseEnter("health")}
        onMouseLeave={() => handleMouseLeave("health")}
        onClick={() => handleNavigation("/Health")}
        className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
      >
        <Image src={currentImages.health} alt="Health" width={40} height={40} />
      </button>
      <h4 className="text-[10pt] m-[10px_0_5px_0]">สุขภาพ</h4>

      <button className="rounded-full border-none p-[5px] m-[20px_0_5px_0]">
        <Image src={Info} alt="Information" width={30} height={30} />
      </button>
    </nav>
  );
}