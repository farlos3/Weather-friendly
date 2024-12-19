"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "/app/globals.css";
import { findNearestProvince } from "../utils/findNearestProvince";
import { RelativeHumidityChart } from "../utils/RainfallChart";

{
  /* ---------------------------- Token and State login  ---------------------------- */
}
import { useEffect, useState, React } from "react";
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

export default function page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [timeRange, setTimeRange] = useState("daily"); // ค่าเริ่มต้น: รายวัน
  const [rainfallData, setRainfallData] = useState([]); // เก็บข้อมูลฝนจาก API

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
        const location = { latitude, longitude };
        const { latitude: lat, longitude: lon } = location;
        console.log("Province:", province, "\nRegion:", region);

        if (isLoggedIn && province) {
          // กรณีล็อกอิน: ใช้จังหวัดที่เลือก
          url = `/ExternalAPI/api/weatherTMD?province=${province}&timeRange=${timeRange}`;
          console.log("API Request URL:", url);
        } else if (!isLoggedIn && region) {
          // กรณีไม่ได้ล็อกอิน: ใช้ข้อมูลพิกัดของภาค
          if (region) {
            url = `/ExternalAPI/api/weatherTMD?lat=${lat}&lon=${lon}&timeRange=${timeRange}`;
            console.log("API Request URL:", url);
          } else {
            console.error("Invalid region:", region);
            return;
          }
        }

        // เรียก API
        if (url) {
          const response = await fetch(url);
          if (response.ok) {
            const result = await response.json();
            setRainfallData(result); // บันทึกข้อมูลที่ได้ไว้ใน state
          } else {
            console.error("Error fetching data:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Trigger only when necessary states are updated
    if ((isLoggedIn && province) || (!isLoggedIn && latitude && longitude)) {
      fetchData();
    }
  }, [isLoggedIn, province, latitude, longitude, timeRange]);

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
        <div className="inline w-full ">
          <div className="flex ml-10 h-[30%] ">
            <div className="w-[30%] p-4">
              <h1 className="text-[2.5rem] font-bold">ปริมาณฝน</h1>
              <Datetime />
              <p className="text-[1.5rem]">{isLoggedIn ? province : region}</p>

              {/* เลือกช่วงเวลา */}
              <select
                id="timeRange"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none"
              >
                <option value="daily">รายวัน</option>
                <option value="hourly">รายชั่วโมง</option>
              </select>
            </div>

            <div className="flex-1 h-full mx-6 p-4 space-y-4 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold">
                ข้อมูลฝน {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}
              </h2>
              <p>จังหวัดที่เลือก: {province || "ยังไม่เลือก"}</p>
              {rainfallData?.WeatherForecasts?.[0]?.forecasts?.[0] && (
                <div>
                  <div>
                    ปริมาณฝน {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                    {rainfallData.WeatherForecasts[0].forecasts[0]?.data
                      ?.rain ?? "ไม่มีข้อมูล"}{" "}
                    %
                  </div>
                  <div>
                    ความเร็วลม{" "}
                    {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                    {rainfallData.WeatherForecasts[0].forecasts[0]?.data
                      ?.ws10m ?? "ไม่มีข้อมูล"}{" "}
                    m/s
                  </div>
                  <div>
                    ความชื้นสัมพัทธ์{" "}
                    {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                    {rainfallData.WeatherForecasts[0].forecasts[0]?.data?.rh ??
                      "ไม่มีข้อมูล"}{" "}
                    %
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center ml-[2.5rem] h-[70%] gap-x-4">
            {rainfallData?.WeatherForecasts?.[0]?.forecasts
              ?.slice(1, 6) // เริ่มจากวันถัดไป
              .map((item, index) => {
                const { data } = item;
                const { rain, ws10m, rh } = data || {};

                return (
                  <div
                    key={index}
                    className="w-[20%] h-[70%] bg-white p-3 rounded-md flex flex-col justify-center p-2"
                  >
                    <div>
                      ปริมาณฝน{" "}
                      {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                      {rain ?? "ไม่มีข้อมูล"} %
                    </div>
                    <div>
                      ความเร็วลม{" "}
                      {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                      {ws10m ?? "ไม่มีข้อมูล"} m/s
                    </div>
                    <div>
                      ความชื้นสัมพัทธ์{" "}
                      {timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}:{" "}
                      {rh ?? "ไม่มีข้อมูล"} %
                    </div>
                  </div>
                );
              })}

            {/* ส่วนแสดงกราฟ */}
            <div className="w-full h-[70%] bg-white p-3 rounded-md flex justify-center items-center">
              <RelativeHumidityChart
                forecasts={rainfallData?.WeatherForecasts?.[0]?.forecasts || []}
                timeRange={timeRange}
                
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}