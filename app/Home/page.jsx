"use client";

import { useRef, useEffect, useState } from "react";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LongdoMap, { longdo, map } from "../components/LongdoMap";
import Dropdown from "../components/Dropdown";
import { Cloud, CloudRain, Sun } from "lucide-react";
// import axios from "axios";

{
  /* ---------------------------- Token and State login  ---------------------------- */
}

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

export default function Home() {
  const router = useRouter();
  const mapKey = "b8e921b16722e026a1b2d9e532b77706";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("C");
  const [sevenDaysForecastData, setSevenDaysForecastData] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      setTokenExpiry();
      console.log("Already Token");
    } else {
      console.log("Not yet Token");
    }
    // console.log("token: ", token);
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

  const getWeatherIcon = (rain, rh, size) => {
    if (rain > 0) return <CloudRain size={size} className="text-blue-500" />;
    if (rh > 80) return <Cloud size={size} className="text-gray-500" />;
    return <Sun size={size} className="text-yellow-500" />;
  };

  const getConditionText = (condition) => {
    const conditionMap = {
      1: "ท้องฟ้าแจ่มใส (Clear)",
      2: "มีเมฆบางส่วน (Partly cloudy)",
      3: "เมฆเป็นส่วนมาก (Cloudy)",
      4: "มีเมฆมาก (Overcast)",
      5: "ฝนตกเล็กน้อย (Light rain)",
      6: "ฝนปานกลาง (Moderate rain)",
      7: "ฝนตกหนัก (Heavy rain)",
      8: "ฝนฟ้าคะนอง (Thunderstorm)",
      9: "อากาศหนาวจัด (Very cold)",
      10: "อากาศหนาว (Cold)",
      11: "อากาศเย็น (Cool)",
      12: "อากาศร้อนจัด (Very hot)",
    };
    return conditionMap[condition] || "ไม่ทราบสถานะ (Unknown)";
  };

  const fetchWeatherData = async () => {
    try {
      let url = "";
      const selectedRegion = regionToProvinceMap[region];

      if (isLoggedIn && province) {
        // ใช้ province ที่เลือกเมื่อ login
        url = `/ExternalAPI/api/weatherTMD?province=${province}`;
      } else if (!isLoggedIn && selectedRegion) {
        // ใช้พิกัดหรือ province ตามภาคที่เลือก
        const { lat, lon } = selectedRegion;
        url = `/ExternalAPI/api/weatherTMD?lat=${lat}&lon=${lon}`;
      }

      console.log("API Request URL:", url);

      if (url) {
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
          // ตรวจสอบว่า result.WeatherForecasts มีข้อมูล 7 วันหรือไม่
          const forecasts = result.WeatherForecasts?.slice(0, 7) || [];
          console.log("Forecasts (7 days):", forecasts);
          setData(forecasts); // เก็บข้อมูล 7 วันใน state
          setError(null);
        } else {
          setError(result.error || "Error fetching data");
        }
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    if (isLoggedIn && province) {
      fetchWeatherData();
    } else if (!isLoggedIn && region) {
      fetchWeatherData();
    }
  }, [province, region]);

  const fetchSevenDaysForecast = async () => {
    try {
      const url = `/ExternalAPI/api/WeatherDesTMD`;
      console.log("7daysForecast API Request URL:", url);

      // const response = await axios.get(url);
      const response = await fetch(url);

      if (response.status === 200) {
        const result = response.data;
        console.log("7daysForecast Data:", result);
        setSevenDaysForecastData(result); // Store overall forecast in state
        setError(null);
      } else {
        setError("Failed to fetch 7-day forecast data.");
      }
    } catch (err) {
      console.error("Error fetching 7-day forecast:", err);
      setError("Failed to fetch 7-day forecast.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn && region) {
      fetchSevenDaysForecast();
    }
  }, [region, isLoggedIn]);

  const regionToProvinceMap = {
    C: { province: "กรุงเทพมหานคร", lat: 13.7563, lon: 100.5018 },
    N: { province: "เชียงใหม่", lat: 18.7877, lon: 99.1508 },
    NE: { province: "ขอนแก่น", lat: 16.4419, lon: 102.8356 },
    E: { province: "ชลบุรี", lat: 13.3611, lon: 100.9847 },
    S: { province: "สงขลา", lat: 7.1897, lon: 100.5953 },
    W: { province: "กาญจนบุรี", lat: 14.0041, lon: 99.5483 },
  };

  const provinces = [
    "กรุงเทพมหานคร",
    "เชียงใหม่",
    "ขอนแก่น",
    "สงขลา",
    "นครราชสีมา",
  ];

  const regions = {
    C: "ภาคกลาง",
    N: "ภาคเหนือ",
    NE: "ภาคตะวันออกเฉียงเหนือ",
    E: "ภาคตะวันออก",
    S: "ภาคใต้",
    W: "ภาคตะวันตก",
  };

  const onMapInit = (mapInstance) => {
    mapInstance.Layers.setBase(longdo.Layers.NORMAL);
    mapInstance.location({ lon: 100.5018, lat: 13.7563 }, true);
    map.zoom(6, true);

    const regions = [
      {
        title: "ภาคเหนือ",
        detail: "พื้นที่ภาคเหนือของประเทศไทย",
        location: { lon: 99.139, lat: 18.794 },
      },
      {
        title: "ภาคตะวันออกเฉียงเหนือ",
        detail: "พื้นที่ภาคตะวันออกเฉียงเหนือของประเทศไทย",
        location: { lon: 102.119, lat: 15.229 },
      },
      {
        title: "ภาคกลาง",
        detail: "พื้นที่ภาคกลางของประเทศไทย",
        location: { lon: 100.5018, lat: 13.7563 },
      },
      {
        title: "ภาคตะวันออก",
        detail: "พื้นที่ภาคตะวันออกของประเทศไทย",
        location: { lon: 101.545, lat: 13.479 },
      },
      {
        title: "ภาคตะวันตก",
        detail: "พื้นที่ภาคตะวันตกของประเทศไทย",
        location: { lon: 99.491, lat: 13.547 },
      },
      {
        title: "ภาคใต้",
        detail: "พื้นที่ภาคใต้ของประเทศไทย",
        location: { lon: 99.438, lat: 7.536 },
      },
    ];

    regions.forEach((region) => {
      mapInstance.Overlays.add(new longdo.Marker(region.location, { title: region.title, detail: region.detail, icon: region.icon }));
    });
  };

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
    >
      <div className="flex justify-between items-center border-b">
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
          <div className="ml-10 w-full border border-cyan-800">
            <Datetime />
            <Dropdown
              isLoggedIn={isLoggedIn}
              provinces={provinces}
              regions={regions}
              province={province}
              region={region}
              setProvince={setProvince}
              setRegion={setRegion}
              zoomToRegion={(regionKey) =>
                console.log("Zooming to:", regionKey)
              } // Optional
            />

            <div className="flex flex-wrap w-full h-[25%] border">
              {/* การ์ด "วันนี้" */}
              <div className="h-full w-full bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-lg flex items-center justify-around border border-blue-500">
                <div className="text-5xl text-gray-600 font-medium">วันนี้</div>

                <div>
                  {getWeatherIcon(
                    data[0]?.forecasts[0]?.data?.rain,
                    data[0]?.forecasts[0]?.data?.rh,
                    90
                  )}
                </div>

                <div className="text-[4rem] font-bold text-gray-800">
                  {data[0]?.forecasts[0]?.data?.tc !== undefined
                    ? `${data[0]?.forecasts[0]?.data?.tc}°`
                    : "N/A"}
                </div>

                <div className="text-lg text-gray-600 space-y-3">
                  <div>
                    ลม:{" "}
                    {data[0]?.forecasts[0]?.data?.ws10m !== undefined
                      ? `${data[0]?.forecasts[0]?.data?.ws10m} m/s`
                      : "N/A"}
                  </div>
                  <div>
                    ความชื้น:{" "}
                    {data[0]?.forecasts[0]?.data?.rh !== undefined
                      ? `${data[0]?.forecasts[0]?.data?.rh}%`
                      : "N/A"}
                  </div>
                  <div>
                    ฝน:{" "}
                    {data[0]?.forecasts[0]?.data?.rain !== undefined
                      ? `${data[0]?.forecasts[0]?.data?.rain} mm`
                      : "N/A"}
                  </div>
                  <div>
                    สถานะ: {getConditionText(data[0]?.forecasts[0]?.data?.cond)}
                  </div>
                </div>
              </div>

              {/* การ์ด 6 วันถัดไป */}
              <div className="flex flex-wrap mt-3 gap-x-1 w-full justify-around border border-red-500">
                {data[0]?.forecasts.slice(1, 7).map((item, index) => {
                  const { time, data } = item;
                  const { tc, ws10m, rh, rain } = data || {};

                  return (
                    <div
                      key={index}
                      className="w-[15%] h-full bg-gradient-to-b from-white to-blue-50 rounded-xl shadow-lg flex flex-col items-center justify-center gap-y-1 pt-2 pb-2"
                    >
                      <div className="text-gray-600 text-[1rem]">
                        {time
                          ? new Date(time)
                              .toLocaleDateString("th-TH", {
                                weekday: "short",
                                day: "numeric",
                              })
                              .replace(" ", "")
                          : "ไม่ระบุวันที่"}
                      </div>

                      <div className="">{getWeatherIcon(rain, rh, 32)}</div>

                      <div className="text-[2rem] font-bold text-gray-800">
                        {tc !== undefined ? `${tc}°` : "N/A"}
                      </div>

                      <div className="text-sm text-gray-600 space-y-3">
                        <div>
                          ลม : {ws10m !== undefined ? `${ws10m} m/s` : "N/A"}
                        </div>
                        <div>
                          ความชื้น : {rh !== undefined ? `${rh}%` : "N/A"}
                        </div>
                        <div>
                          ฝน : {rain !== undefined ? `${rain} mm` : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {sevenDaysForecastData ? (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">พยากรณ์อากาศรวม 7 วัน</h3>
                  <div className="text-gray-700 text-sm">
                    <p className="font-bold">
                      {sevenDaysForecastData.OverallForecast.Date}
                    </p>
                    <p>
                      {
                        sevenDaysForecastData.OverallForecast
                          .OverallDescriptionThai
                      }
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">พยากรณ์รายภาค</h4>
                    {sevenDaysForecastData.OverallForecast.RegionForecast.map(
                      (region, index) => (
                        <div key={index} className="mt-2">
                          <p className="font-bold">{region.RegionNameThai}</p>
                          <p>{region.DescriptionThai}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end border w-[50%] mr-[1rem]">
            <h3 className="text-[2rem] mr-[1rem] font-bold">ประเทศไทย</h3>
            <LongdoMap id="homeMap" mapKey={mapKey} onMapInit={onMapInit} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
