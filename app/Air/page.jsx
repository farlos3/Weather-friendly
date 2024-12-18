"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import "/app/globals.css";

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
  {
    /* ---------------------------- Set Token  ---------------------------- */
  }
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
  {
    /* ---------------------------- Set Token  ---------------------------- */
  }

  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const mapKey = process.env.NEXT_PUBLIC_LONGDO_MAP_KEY;
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Fetch user's location on load
  useEffect(() => {
    if (userPosition) {
      fetchAirQualityData(
        userPosition.lat,
        userPosition.lon,
        "ตำแหน่งของคุณ",
        true
      );
      fetchNearbyLocations(userPosition.lat, userPosition.lon); // ดึงจังหวัดใกล้เคียง
    }
  }, [userPosition]);

  const initMap = () => {
    if (window.longdo && window.longdo.Map) {
      const map = new window.longdo.Map({
        placeholder: document.getElementById("longdo-map"), // Div ID สำหรับแผนที่
        geolocation: true, // เปิดใช้ปุ่ม Geolocation
      });

      map.Layers.setBase(window.longdo.Layers.NORMAL);
      map.location({ lon: 100.5018, lat: 13.7563 }, true); // Initial position (Bangkok)
      map.zoom(6, true); // Set zoom level
      setIsMapLoaded(true);
    }
  };

  // Load Longdo Map Script
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

  // Fetch air quality data near the user's position
  useEffect(() => {
    if (userPosition) {
      fetchAirQualityData(
        userPosition.lat,
        userPosition.lon,
        "ตำแหน่งของคุณ",
        true
      );
      fetchNearbyLocations(userPosition.lat, userPosition.lon); // ดึงจังหวัดใกล้เคียง
    }
  }, [userPosition]);

  const fetchAirQualityData = async (
    lat,
    lon,
    locationName = "Unknown",
    isUserLocation = false
  ) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      if (data.list) {
        const newData = {
          location: locationName,
          isUserLocation,
          components: data.list[0].components,
          aqi: data.list[0].main.aqi,
        };

        setAirQualityData((prevData) => {
          // ลบตำแหน่งที่ซ้ำกันก่อนเพิ่มข้อมูลใหม่
          const filteredData = prevData.filter(
            (item) => item.location !== locationName
          );
          return [newData, ...filteredData]; // ใส่ข้อมูลใหม่ที่ด้านบน
        });
      }
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    }
  };

  const fetchNearbyLocations = async (userLat, userLon) => {
    try {
      const nearbyLocations = await getNearbyProvinces(userLat, userLon); // ดึงจังหวัดใกล้เคียงจาก API
      nearbyLocations.forEach((location) => {
        fetchAirQualityData(location.lat, location.lon, location.name, false);
      });
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
    }
  };

  // Fetch latitude and longitude using OpenWeatherMap Geocoding API
  const fetchCoordinates = async (query) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query},TH&limit=5&appid=${OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      setFilteredLocations(data);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

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

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchText(location.name);
    setIsDropdownOpen(false);
    fetchAirQualityData(location.lat, location.lon, location.name, false);
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
                {selectedLocation ? selectedLocation.name : "ตำแหน่งของคุณ"}
              </h2>
            </div>
          </header>

          {/* Map Section */}
          <section className="mt-6">
            <div className="border rounded-lg h-80 mb-4 bg-gray-200">
              {/* Longdo Map */}
              <div id="longdo-map" className="w-full h-full"></div>
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
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {location.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Air Quality List */}
          <div className="bg-yellow-300 rounded-lg border w-full p-4 space-y-4">
            {airQualityData.map((data, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-md ${
                  data.isUserLocation ? "bg-green-200" : "bg-white"
                }`}
              >
                <div>
                  <p className="font-bold text-lg">{data.location}</p>
                  <p className="text-sm">
                    PM 2.5: {data.components.pm2_5} μg/m³
                  </p>
                  <p className="text-sm">PM 10: {data.components.pm10} μg/m³</p>
                  <p className="text-sm">Ozone: {data.components.o3} μg/m³</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl">{data.aqi}</p>
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
