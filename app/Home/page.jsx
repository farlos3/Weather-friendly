"use client";

import { useRef, useEffect, useState } from "react";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import LongdoMap ,{ longdo, map } from "../components/LongdoMap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";


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
import { Cloud, CloudRain, Sun } from "lucide-react";
import axios from "axios";
import SevenDaysForecast from "../components/SevenDaysForecast";

export default function Home() {
  const router = useRouter();
  const mapKey = "b8e921b16722e026a1b2d9e532b77706"; // API key, should hide in .env
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [province, setProvince] = useState("กรุงเทพมหานคร");
  const [region, setRegion] = useState("C");
  const [sevenDaysForecastData, setSevenDaysForecastData] = useState();

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

  const fetchWeatherDataByProvince = async (province) => {
    try {
      const url1 = `/ExternalAPI/api/weatherTMD?province=${province}`;
      console.log("Province Weather API URL:", url1);
      const response = await fetch(url1);
      if (response.ok) {
        const result = await response.json();
        setData(result?.WeatherForecasts?.slice(0, 7) || []);
        setError(null);
      } else {
        setError("Failed to fetch province weather data");
      }
    } catch (err) {
      setError("Error fetching province weather data");
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const url = `/ExternalAPI/api/weatherTMD?lat=${lat}&lon=${lon}`;
      console.log("Region Weather API URL:", url);
      const response = await fetch(url);
      if (response.ok) {
        const result = await response.json();
        setData(result?.WeatherForecasts?.slice(0, 7) || []);
        setError(null);
      } else {
        setError("Failed to fetch region weather data");
      }
    } catch (err) {
      setError("Error fetching region weather data");
    }
  };

  useEffect(() => {
    if (isLoggedIn && province) {
      fetchWeatherDataByProvince();
    } else if (!isLoggedIn && region) {
      fetchWeatherData();
    }
  }, [province, region]);

  useEffect(() => {
    const fetchSevenDaysForecast = async () => {
      try {
        const url = `/ExternalAPI/api/WeatherDesTMD`;
        console.log("7daysForecast API Request URL:", url);

        const response = await fetch(url);

        if (response.status === 200) {
          const result = await response.json();
          console.log("7daysForecast Data:", result);

          // แสดงข้อมูล `OverallForecast` ใน console
          const overallForecast = result?.OverallForecast || {};

          console.log("OverallForecast Date:", overallForecast.Date);
          console.log(
            "OverallDescriptionThai:",
            overallForecast.OverallDescriptionThai,
            "OveralRegionName :",
            overallForecast.RegionForecast?.[0].RegionNameThai[0]
          );
          console.log(
            "OverallRegionName ",
            overallForecast.RegionForecast[1].RegionNameThai
          );

          setSevenDaysForecastData(result); // เก็บข้อมูลใน state
          setError(null);
        } else {
          setError("Failed to fetch 7-day forecast data.");
        }
      } catch (err) {
        console.error("Error fetching 7-day forecast:", err);
        setError("Failed to fetch 7-day forecast.");
      }
    };

    fetchSevenDaysForecast();
  }, []);

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

      <div className="flex h-full w-full">
        <Navbar />
        <div className="flex justify-between w-full">
          <div className="ml-10 w-[50%] border border-cyan-800">
            <Datetime />
            {/* Dropdown for Region/Province Selection */}
            <select
              id="locationSelector"
              value={isLoggedIn ? province || region : region} // แสดงค่าเริ่มต้นตามเงื่อนไขการล็อกอิน
              onChange={(e) => {
                const selectedValue = e.target.value;
                if (isLoggedIn) {
                  if (selectedValue in regions) {
                    // เมื่อเลือกภูมิภาค
                    setRegion(selectedValue);
                    const selectedRegion = regionToProvinceMap[selectedValue];
                    if (selectedRegion)
                      fetchWeatherData(selectedRegion.lat, selectedRegion.lon);
                  } else {
                    // เมื่อเลือกจังหวัด
                    setProvince(selectedValue);
                    fetchWeatherDataByProvince(selectedValue);
                  }
                } else {
                  // กรณียังไม่ได้ล็อกอิน เลือกได้เฉพาะภูมิภาค
                  setRegion(selectedValue);
                  const selectedRegion = regionToProvinceMap[selectedValue];
                  if (selectedRegion)
                    fetchWeatherData(selectedRegion.lat, selectedRegion.lon);
                }
              }}
              className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none"
            >
              {isLoggedIn ? (
                // เมื่อผู้ใช้ล็อกอิน สามารถเลือกได้ทั้งภูมิภาคและจังหวัด
                <>
                  <option value="" disabled>
                    เลือกภูมิภาคหรือจังหวัด
                  </option>
                  {Object.entries(regions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                  {provinces.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </>
              ) : (
                // กรณียังไม่ได้ล็อกอิน แสดงเฉพาะตัวเลือกภูมิภาค
                <>
                  <option value="" disabled>
                    เลือกภูมิภาค
                  </option>
                  {Object.entries(regions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </>
              )}
            </select>

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
              <div className="container mx-auto p-4">
                {sevenDaysForecastData ? (
                  <div className="space-y-4">
                    <h3 className="inline text-xl font-bold">
                      พยากรณ์อากาศรวม 7 วัน
                    </h3>
                    <div className="mt-4">
                      <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        
                      >
                        <SwiperSlide>
                          <div className="p-4 border rounded-lg shadow-sm bg-white">
                            <div className="mb-4">
                              <h3 className="font-bold text-lg mb-2">
                                ภาพรวมการพยากรณ์
                              </h3>
                              <p className="text-gray-700">
                                {sevenDaysForecastData.OverallForecast.Date}
                              </p>
                              <p className="text-gray-700">
                                {
                                  sevenDaysForecastData.OverallForecast
                                    .OverallDescriptionThai
                                }
                              </p>
                            </div>
                          </div>
                        </SwiperSlide>
                        {sevenDaysForecastData.OverallForecast.RegionForecast.map(
                          (region, index) => (
                            <SwiperSlide key={index}>
                              <div className="p-4 border rounded-lg shadow-sm bg-white">
                                <h3 className="font-bold text-lg mb-2">
                                  {region.RegionNameThai}
                                </h3>
                                <p className="text-gray-700">
                                  {region.DescriptionThai}
                                </p>
                              </div>
                            </SwiperSlide>
                          )
                        )}
                      </Swiper>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end border w-full">
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