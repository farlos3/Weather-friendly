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

  const [homeImage, setHomeImage] = useState(Home);
  const [locationImage, setLocationImage] = useState(Location);
  const [rainfallImage, setRainfallImage] = useState(Rainfall);
  const [airQImage, setAirQImage] = useState(AirQ);
  const [healthImage, setHealthImage] = useState(Health);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return null; // Render nothing until `time` is available

  function handleHomeMouseEnter() {
    setHomeImage(HomeHover);
  }
  function handleHomeMouseLeave() {
    setHomeImage(Home);
  }
  function handleRainfallMouseEnter() {
    setRainfallImage(Rainfallhover);
  }
  function handleRainfallMouseLeave() {
    setRainfallImage(Rainfall);
  }
  function handleLocationMouseEnter() {
    setLocationImage(Locationhover);
  }
  function handleLocationMouseLeave() {
    setLocationImage(Location);
  }
  function handleAirQMouseEnter() {
    setAirQImage(AirQhover);
  }
  function handleAirQMouseLeave() {
    setAirQImage(AirQ);
  }
  function handleHealthMouseEnter() {
    setHealthImage(Healthhover);
  }
  function handleHealthMouseLeave() {
    setHealthImage(Health);
  }

  function backHome() {
    router.push("/");
  }

  function backLocation() {
    router.push("/Location");
  }

  function backRainfall() {
    router.push("/Rainfall");
  }

  function backAir() {
    router.push("/Air");
  }

  function backHealth() {
    router.push("/Health");
  }

  return (
    <div className="border w-max flex items-center justify-center">
      <nav className="text-white bg-[#0A1931] px-2 rounded-[2rem] flex flex-col justify-center items-center shadow-[0px_0px_10px_4px_#11121374]">
        <button
          className="Home  flex flex-col items-center justify-center text-white mt-[2rem] w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
          onClick={backHome}
          onMouseEnter={handleHomeMouseEnter}
          onMouseLeave={handleHomeMouseLeave}
        >
          <Image
            src={homeImage}
            alt="Home"
            className="w-[2rem] h-[2rem] object-contain flex items-center"
          />
        </button>
        <h4 className="flex flex-col items-center w-max h-max text-[8.5pt]">
          หน้าหลัก
        </h4>
        <button
          className="Location flex flex-col items-center justify-center  mt-[2rem] w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
          onClick={backLocation}
          onMouseEnter={handleLocationMouseEnter}
          onMouseLeave={handleLocationMouseLeave}
        >
          <Image
            src={locationImage}
            alt="Location"
            className="w-[2rem] h-[2rem] object-contain flex items-center"
          />
        </button>
        <h4 className="flex flex-col items-center w-max h-max text-[8.5pt] ">
          สถานที่
        </h4>

        <button
          className="Rainfall flex flex-col items-center justify-center text-white mt-[2rem]  w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
          onClick={backRainfall}
          onMouseEnter={handleRainfallMouseEnter}
          onMouseLeave={handleRainfallMouseLeave}
        >
          <Image
            src={rainfallImage}
            alt="Weather"
            className="w-[2rem] h-[2rem] object-contain flex items-center"
          />
        </button>
        <h4 className="flex flex-col items-center w-max h-max text-[8.5pt]">
          ปริมาณน้ำฝน
        </h4>

        <button
          className="AirQ flex flex-col items-center justify-center text-white mt-[2rem] w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
          onClick={backAir}
          onMouseEnter={handleAirQMouseEnter}
          onMouseLeave={handleAirQMouseLeave}
        >
          <Image
            src={airQImage}
            alt="Air Quality"
            className="w-[2rem] h-[2rem] object-contain flex items-center"
          />
        </button>
        <h4 className="flex flex-col items-center w-max h-max text-[8.5pt]">
          คุณภาพอากาศ
        </h4>

        <button
          className="Health flex flex-col items-center justify-center text-white mt-[2rem] w-[3rem] h-[3rem] rounded-full transition-opacity duration-300 ease-in-out hover:bg-white hover:shadow-[0px_0px_15px_2px_#246ada42] hover:text-[#0A1931] hover:opacity-80"
          onClick={backHealth}
          onMouseEnter={handleHealthMouseEnter}
          onMouseLeave={handleHealthMouseLeave}
        >
          <Image
            src={healthImage}
            alt="Health"
            className="w-[2rem] h-[2rem] object-contain flex items-center"
          />
        </button>
        <h4 className="flex flex-col items-center w-max h-max text-[8.5pt]">
          สุขภาพ
        </h4>

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