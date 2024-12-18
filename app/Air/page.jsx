"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import "/app/globals.css";
import { findNearestProvince } from "../utils/findNearestProvince";
import { findTop5NearestProvinces } from "../utils/Top5NearestProvinces";

import { Cloud, CloudRain, Sun } from "lucide-react";
import LongdoMap, { longdo, map } from "../components/LongdoMap";

{
  /* ---------------------------- Token and State login  ---------------------------- */
}
import { useEffect, useState } from "react";
import RegisterButton from "../components/RegisterButton";
import ProfilePopup from "../components/ProfilePopup";
import {
  getToken,
  setToken,
  setTokenExpiry,
  removeToken,
  removeTokenExpiry,
} from "../utils/auth";
import { useRouter } from "next/navigation";
{
  /* ---------------------------- Token and State login  ---------------------------- */
}

export default function Page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [airQualityData, setAirQualityData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [airData, setAirData] = useState([]); // เก็บข้อมูลฝนจาก API

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const mapKey = process.env.NEXT_PUBLIC_LONGDO_MAP_KEY;
  // const [isMapLoaded, setIsMapLoaded] = useState(false);

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

    setIsLoggedIn(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setLatitude(userLat);
          setLongitude(userLon);

          const nearest = findNearestProvince(userLat, userLon);
          const nearest_5 = findTop5NearestProvinces(userLat, userLon);
          if (nearest) {
            setProvince(nearest.name); // อัปเดตจังหวัด
            setRegion(nearest.region); // อัปเดตภาค
          }
          // console.log("จังหวัดที่ใกล้ที่สุด:", nearest.name, "\ntype:", typeof nearest.name);
          // console.log("ภาคที่ใกล้ที่สุด:", nearest.region, "\ntype:", typeof nearest.region);
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setProvince("ไม่สามารถดึงข้อมูลตำแหน่งได้");
          setRegion("ไม่สามารถระบุภาคได้");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setProvince("ไม่รองรับการดึงตำแหน่ง");
      setRegion("ไม่รองรับการระบุภาค");
    }
  }, [province, region]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        // const location = { latitude, longitude };
        // const { latitude: lat, longitude: lon } = location;
        console.log("Province:", province, "\nRegion:", region);

        if (isLoggedIn && province) {
          // กรณีล็อกอิน: ใช้จังหวัดที่เลือก
          url = `/ExternalAPI/api/Air4Thai?groupType=province&province=${province}`;
        } else if (!isLoggedIn && region) {
          // กรณีไม่ได้ล็อกอิน: ใช้ข้อมูลพิกัดของภาค
          if (region) {
            url = `/ExternalAPI/api/Air4Thai?groupType=region&region=${region}`;
          } else {
            console.error("No valid province or region to fetch data.");
            return;
          }
        }

        console.log("API Request URL:", url);

        // เรียก API
        if (url) {
          const response = await fetch(url);
          if (response.ok) {
            const result = await response.json();
            setAirData(result); // บันทึกข้อมูลที่ได้ไว้ใน state
          } else {
            console.error("Error fetching data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Trigger only when necessary states are updated
    if ((isLoggedIn && province) || (!isLoggedIn && region)) {
      fetchData();
    }
  }, [isLoggedIn, province, latitude, longitude]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() !== "") {
      fetchCoordinates(value);
    } else {
      setFilteredLocations([]);
      setIsDropdownOpen(false);
    }
  };

  const onMapInit = (mapInstance) => {
    mapInstance.Layers.setBase(longdo.Layers.NORMAL);
    mapInstance.location({ lon: 100.5018, lat: 13.7563 }, true);
    map.zoom(6, true);
  };

  const handleLocationSelect = (location) => {
    setSearchText(location.name); // Update the search text with the selected location
    setProvince(location.name);   // Store the selected location in the state
    setIsDropdownOpen(false);     // Close the dropdown
  };
  

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/AirBackground.gif')" }}
    >
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

      <section className="border flex h-full w-full max-[100%]">
        <Navbar />
        <section className="flex-1 border w-full max-[100%] mx-6">
          <header className="border flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">คุณภาพอากาศ</h1>
              <Datetime />
              <h2 className="text-2xl">
                <p className="text-[1.5rem]">
                  {isLoggedIn ? province : region}
                </p>
              </h2>
            </div>
          </header>

          {/* Map Section */}
          <section className="mt-6">
            <div className="border rounded-lg h-80 mb-4 bg-gray-200">
              {/* Longdo Map */}
              {/* <LongdoMap mapKey={mapKey} /> */}
              <LongdoMap id="homeMap" mapKey={mapKey} onMapInit={onMapInit} />
            </div>
          </section>
        </section>

        <div className="border h-full mx-6 w-1/3 p-4 space-y-4">
          <div className="flex items-center justify-between p-4">
            <p>ดีมาก</p>
            <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-full"></div>
            <p>แย่</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="ค้นหาจังหวัดหรือเมืองในประเทศไทย"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            {isDropdownOpen && filteredLocations.length > 0 && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full">
                {filteredLocations.map((location, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Air Quality Data */}
          <div className="mt-4 space-y-4">
            {airQualityData.map((data, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-md shadow-sm"
              >
                <h3 className="text-lg font-semibold">{data.location}</h3>
                <p>AQI: {data.aqi}</p>
                <ul>
                  {Object.entries(data.components).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
