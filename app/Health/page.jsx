"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
import { findNearestProvince } from "../utils/findNearestProvince";
{
  /* ---------------------------- Token and State login  ---------------------------- */
}

export default function page() {
  {
    /* ---------------------------- Set Token  ---------------------------- */
  }
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [timeRange, setTimeRange] = useState("daily"); 
  const [healthData, setHealthData] = useState([]); 
  const [weatherData, setWeatherData] = useState([]);
  const fields = 'tc,rh,slp,rain,ws10m,wd10m,cloudlow,cloudmed,cloudhigh,cond';

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
            setProvince(nearest.name);
            setRegion(nearest.region);
          }
        },
        (error) => {
          console.error("Error getting location:", error.message);
          setProvince("Unable to get location");
          setRegion("Unable to determine region");
        }
      );
    }
  }, []);

 
  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        let url = "";
        if (isLoggedIn && province) {
          url = `/ExternalAPI/api/weatherTMD?province=${province}&timeRange=${timeRange}`;
        } else if (!isLoggedIn && latitude && longitude) {
          url = `/ExternalAPI/api/weatherTMD?lat=${latitude}&lon=${longitude}&timeRange=${timeRange}`;
        }

        if (url) {
          const response = await fetch(url);
          const result = await response.json();
          setHealthData(result);
        }
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    if ((isLoggedIn && province) || (!isLoggedIn && latitude && longitude)) {
      fetchHealthData();
    }
  }, [isLoggedIn, province, latitude, longitude, timeRange]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let url = "";
        if (isLoggedIn && province) {
          // ใช้ province หากผู้ใช้ล็อกอิน
          url = `/api/weatherTMD?province=${encodeURIComponent(province)}&timeRange=${timeRange}`;
        } else if (!isLoggedIn && latitude && longitude) {
          // ใช้ latitude และ longitude หากผู้ใช้ไม่ได้ล็อกอิน
          url = `/api/weatherTMD?lat=${latitude}&lon=${longitude}&timeRange=${timeRange}`;
        }

        if (url) {
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
          }

          const result = await response.json();

          // ดึงเฉพาะข้อมูล tc_max, tc_min และวันที่
          const filteredData = result.map((item) => ({
            date: item.date, // วันที่
            tc_max: item.tc_max, // อุณหภูมิสูงสุด
            tc_min: item.tc_min, // อุณหภูมิต่ำสุด
          }));

          console.log("Filtered Weather Data:", filteredData); // ตรวจสอบข้อมูลที่ดึงมาใน console
          setWeatherData(filteredData); // อัปเดตข้อมูลใน state
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if ((isLoggedIn && province) || (!isLoggedIn && latitude && longitude)) {
      fetchWeatherData();
    }
  }, [isLoggedIn, province, latitude, longitude, timeRange]);


  {
    /* ---------------------------- Set Token  ---------------------------- */
  }

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
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

      <div className="flex h-full max-[100%]">
        <Navbar />
        <div className="ml-10 inline w-full border">
          <div className="flex h-[60%] border">
            <div className="h-full w-[40%] border">
              <h3 className="text-[3rem] font-bold">
                {isLoggedIn ? province : region}
              </h3>
              <Datetime />
              <div className="w-full h-[60%] border">
                {healthData?.WeatherForecasts?.[0]?.forecasts?.[0] && (
                  <div>
                    <div>
                      ปริมาณฝน รายวัน:{" "}
                      {healthData.WeatherForecasts[0].forecasts[0]?.data
                        ?.rain ?? "ไม่มีข้อมูล"}{" "}
                      %
                    </div>
                    <div>
                      ความเร็วลม รายวัน:{" "}
                      {healthData.WeatherForecasts[0].forecasts[0]?.data
                        ?.ws10m ?? "ไม่มีข้อมูล"}{" "}
                      m/s
                    </div>
                    <div>
                      ความชื้นสัมพัทธ์ รายวัน:{" "}
                      {healthData.WeatherForecasts[0].forecasts[0]?.data?.rh ??
                        "ไม่มีข้อมูล"}{" "}
                      %
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[60%] h-full border">
              <div className="w-full h-[50%] border">
                <div className="mt-[1rem] flex justify-start items-center ml-4 p-4 rounded-[2rem] w-max h-[20%] text-white font-bold bg-[#185ADB] shadow-[0px_0px_10px_2px_#11121374]">
                  คำแนะนำด้านสุขภาพ
                </div>
                <div className="mt-[1rem] ml-4 bg-white shadow-[0px_0px_15px_1px_#11121374] w-[60%] h-[60%] rounded-[1.5rem]"></div>
              </div>
              <div className="w-full h-[50%] space-y-4">
                <div className="mt-[1rem] flex justify-start items-center ml-4 p-4 rounded-[2rem] w-max h-[20%] text-black font-bold bg-[#FFC947] shadow-[0px_0px_10px_2px_#11121374]">
                  คำแนะนำด้านสุขภาพ
                </div>
                <div className="flex flex-wrap justify-evenly items-center border h-max">
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap  p-4 gap-x-4 justify-evenly h-[40%]">
            {weatherData?.weather_forecast?.locations?.[0]?.forecasts
              ?.slice(1, 5) // ดึง 4 รายการที่ต้องการแสดงผล
              .map((forecast, index) => (
                <div
                  key={index}
                  className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"
                >
                  <div>
                    อุณหภูมิสูงสุด: {forecast.tc_max ?? "ไม่มีข้อมูล"} °C
                  </div>
                  <div>
                    อุณหภูมิต่ำสุด: {forecast.tc_min ?? "ไม่มีข้อมูล"} °C
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
