"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import "/app/globals.css";
import { findNearestProvince } from "../utils/findNearestProvince";
import AirQualityList from "../utils/AirQualityList";
import ProvinceAirQualityList from "../utils/ProvinceAirQualityList";

import { useEffect, useState } from "react";
import RegisterButton from "../components/RegisterButton";
import ProfilePopup from "../components/ProfilePopup";
import { getToken, setTokenExpiry, removeToken } from "../utils/auth";
import { useRouter } from "next/navigation";
import LongdoMap, { longdo } from "../components/LongdoMap";

export default function Page() {
  const router = useRouter();

  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [airQualityData, setAirQualityData] = useState([]);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const mapKey = process.env.NEXT_PUBLIC_LONGDO_MAP_KEY;

  // Manage login state
  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      setTokenExpiry();
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };

  // Fetch user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          setLatitude(lat);
          setLongitude(lon);

          const nearest = findNearestProvince(lat, lon);

          if (nearest) {
            setProvince(nearest.name);
            setRegion(nearest.region);
          }
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
  }, []);

  // Fetch air quality data
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";

        if (isLoggedIn && province) {
          url = `/ExternalAPI/api/Air4Thai?groupType=province}`;
        } else if (!isLoggedIn && region) {
          // Fetch region data if not logged in and a region is selected
          url = `/ExternalAPI/api/Air4Thai?groupType=region`;
        }

        console.log("Url: ");

        if (url) {
          const response = await fetch(url);
          if (response.ok) {
            const result = await response.json();
            setAirQualityData(result);
          } else {
            console.error("Error fetching data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Trigger fetch if either isLoggedIn and province, or not logged in and region is available
    if ((isLoggedIn && province) || (!isLoggedIn && region)) {
      fetchData();
    }
  }, [isLoggedIn, province, latitude, longitude, region]);

  const onMapInit = (mapInstance) => {
    mapInstance.Layers.setBase(longdo.Layers.NORMAL);
    mapInstance.location({ lon: 100.5018, lat: 13.7563 }, true);
    mapInstance.zoom(6, true);
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/AirBackground.gif')" }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 border-b">
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
            {isProfilePopupVisible && (
              <ProfilePopup
                isVisible={isProfilePopupVisible}
                onClose={() => setIsProfilePopupVisible(false)}
                onLogout={handleLogout}
              />
            )}
          </div>
        ) : (
          <RegisterButton />
        )}
      </div>

      {/* Main Content */}
      <section className="flex flex-grow">
        <Navbar />
        <section className="flex-1 p-6">
          <header>
            <h1 className="text-3xl font-bold">คุณภาพอากาศ</h1>
            <Datetime />
            <h2 className="text-2xl">
              {isLoggedIn ? province : region || "ข้อมูลไม่พร้อมใช้งาน"}
            </h2>
          </header>

          {/* Map Section */}
          <div className="mt-6">
            <div className="border rounded-lg h-80 bg-gray-200">
              <LongdoMap id="homeMap" mapKey={mapKey} onMapInit={onMapInit} />
            </div>
          </div>
        </section>

        <aside className="w-1/3 p-6 space-y-4 border-l">
          <div className="flex items-center justify-between">
            <p>ดีมาก</p>
            <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-full"></div>
            <p>แย่</p>
          </div>

          <div className="air-quality-section">
            <div className="overflow-y-auto max-h-[500px] border rounded-lg p-4">
              {isLoggedIn ? (
                <ProvinceAirQualityList
                  airQualityData={airQualityData}
                  userLat={latitude}
                  userLon={longitude}
                />
              ) : (
                <AirQualityList
                  airQualityData={airQualityData}
                  userLat={latitude}
                  userLon={longitude}
                />
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
