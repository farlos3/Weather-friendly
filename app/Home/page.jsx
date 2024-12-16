"use client";
//ส่วนที่ import ประกาศตัวแปร
import { useRef, useEffect, useState } from "react";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { longdo, map, LongdoMap } from "../components/LongdoMap";
import Dropdown from "../components/Dropdown";
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


export default function Home() {

// ประกาศเอฟเฟค
  const router = useRouter();
  const mapKey = "b8e921b16722e026a1b2d9e532b77706"; // API key, should hide in .env
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [province, setProvince] = useState(""); // Add state for province if needed
  const [region, setRegion] = useState("C"); // Add state for region if needed

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

  const fetchWeatherData = async () => {
    try {
      const url = isLoggedIn
        ? `/ExternalAPI/api/weatherTMD?province=${province}`
        : `/ExternalAPI/api/weatherTMD?region=${region}`;
      console.log("API Request URL:", url); // ตรวจสอบ URL ที่จะส่ง

      const response = await fetch(url);
      const result = await response.json();

      if (response.ok) {
        // สมมติว่า result.Forecasts เป็นข้อมูลพยากรณ์อากาศ
        const forecasts = result.WeatherForecasts;
        if (forecasts && forecasts.length > 0) {
          const forecast = forecasts[0]; // ใช้พยากรณ์ข้อมูลอันแรก
          setData({
            tc: forecast.forecasts[0]?.data?.tc || "N/A", // อุณหภูมิ
            humidity: forecast.forecasts[0]?.data?.rh || "N/A", // ความชื้น
            condition: forecast.forecasts[0]?.data?.cond || "N/A", // สถานะอากาศ
          });
        }
        setError(null);
      } else {
        setError(result.error || "Error fetching data");
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [province, region, isLoggedIn]);

  const regions = [
    { code: "C", name: "ภาคกลาง", lat: 13.7563, lng: 100.5018 },
    { code: "N", name: "ภาคเหนือ", lat: 18.7877, lng: 99.1508 },
    { code: "NE", name: "ภาคตะวันออกเฉียงเหนือ", lat: 15.2294, lng: 102.0975 },
    { code: "E", name: "ภาคตะวันออก", lat: 12.78, lng: 101.3565 },
    { code: "S", name: "ภาคใต้", lat: 7.0083, lng: 100.2939 },
    { code: "W", name: "ภาคตะวันตก", lat: 11.81136, lng: 99.797974 },
  ];

  const initMap = () => {
    map.Layers.setBase(longdo.Layers.NORMAL);
    map.location({ lon: 100.5018, lat: 13.7563 }, true);
    map.zoom(6, true);

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
        title: "ภาคอีสาน",
        detail: "พื้นที่ภาคอีสานของประเทศไทย",
        location: { lon: 102.0975, lat: 15.2294 },
      },
      {
        title: "ภาคตะวันออก",
        detail: "พื้นที่ภาคตะวันออกของประเทศไทย",
        location: { lon: 101.3565, lat: 12.78 },
      },
      {
        title: "ภาคตะวันตก",
        detail: "พื้นที่ภาคตะวันตกของประเทศไทย",
        location: { lon: 99.797974, lat: 11.81136 },
      },
      {
        title: "ภาคใต้",
        detail: "พื้นที่ภาคใต้ของประเทศไทย",
        location: { lon: 100.2939, lat: 7.0083 },
      },
    ];

    regions.forEach((region) => {
      map.Overlays.add(
        new longdo.Marker(region.location, {
          title: region.title,
          detail: region.detail,
          popup: { message: `${region.title}: ${region.detail}` },
        })
      );
    });
  };

  const zoomToRegion = (lat, lng) => {
    if (mapRef.current) {
      map.location({ lon: lng, lat: lat }, true);
      map.zoom(10, true);
    }
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
    >
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
                onLogout={handleLogout}
              />
            </div>
          </div>
        ) : (
          <RegisterButton />
        )}
      </div>

      <div className="flex h-full">
        <Navbar />
        <div className="flex justify-between w-full">
          <div className="ml-10 w-full">
            <Datetime />
            <div className="mt-4 mb-4 w-[15rem] h-[2rem] border">
              {isLoggedIn ? (
                <div className="mb-6">
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    เลือกจังหวัด:
                  </label>
                  <select
                    id="province"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              transition-all duration-300 shadow-sm"
                  >
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="mb-6">
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value);
                      const regionData = regions.find(
                        (r) => r.code === e.target.value
                      );
                      zoomToRegion(regionData.lat, regionData.lng); // เมื่อเลือกภูมิภาคแล้วซูมไปยังตำแหน่งนั้น
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-sm"
                  >
                    {regions.map(({ code, name }) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex border-4 border-indigo-500/100 gap-4">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <div className="w-[10rem] h-[10rem] border-4 border-indigo-500/100">
                  {isLoggedIn
                    ? `ข้อมูลอากาศสำหรับจังหวัด: ${province}`
                    : `ข้อมูลอากาศสำหรับภูมิภาค: ${region}`}
                  <div>
                    <p>สถานะอากาศ: {data.condition}</p>
                    <p>อุณหภูมิ: {data.tc} °C</p>
                    <p>ความชื้น: {data.humidity}%</p>
                  </div>
                </div>
                {/* Repeat as needed */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end border w-[50%] mr-[1rem]">
            <h3 className="text-[2rem] mr-[1rem] font-bold">ประเทศไทย</h3>
            <LongdoMap
              id="longdo-map"
              mapKey={mapKey}
              callback={initMap}
              ref={mapRef}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
