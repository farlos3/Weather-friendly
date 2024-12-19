"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { findNearestProvince } from "../utils/findNearestProvince";

{ /* ---------------------------- Token and State login  ---------------------------- */ }
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
{ /* ---------------------------- Token and State login  ---------------------------- */ }

export default function page() {
  { /* ---------------------------- Set Token  ---------------------------- */ }
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
   const [timeRange, setTimeRange] = useState("daily");
  const [weatherData, setWeatherData] = useState([]);

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

  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfilePopupVisible(!isProfilePopupVisible);
  };
  {
    /* ---------------------------- Set Token  ---------------------------- */
  }

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
          // กรณีล็อกอิน: ใช้จังหวัด
          url = `/ExternalAPI/api/weatherTMD?province=${province}&timeRange=daily`;
          console.log("API Request URL:", url);
        } else if (!isLoggedIn && region) {
          // กรณีไม่ได้ล็อกอิน: ใช้ข้อมูลพิกัดของภาค
          if (region) {
            url = `/ExternalAPI/api/weatherTMD?lat=${lat}&lon=${lon}&timeRange=daily`;
            console.log("API Request URL:", url);
          }
        }

        // เรียก API
        if (url) {
          const response = await fetch(url);
          if (response.ok) {
            const result = await response.json();
            // setHealthData(result);
            setWeatherData(result.weatherData);
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
  }, [isLoggedIn, province, latitude, longitude]);  

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
              <p className="text-[2.5rem] font-bold">
                {isLoggedIn ? province : region}
              </p>
              <Datetime />
              <div className="w-full h-[60%] border">
              {weatherData && weatherData.WeatherForecasts ? (
                <div>
                  <p>
                    Max Temp:{" "}
                    {weatherData.WeatherForecasts[0].forecasts[0].data.tc_max}°C
                  </p>
                  <p>
                    Min Temp:{" "}
                    {weatherData.WeatherForecasts[0].forecasts[0].data.tc_min}°C
                  </p>
                  <p>
                    Humidity:{" "}
                    {weatherData.WeatherForecasts[0].forecasts[0].data.rh}%
                  </p>
                </div>
              ) : (
                <p>Loading weather data...</p>
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
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]">
              <p>{weatherData}</p>
            </div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]">
              <p>{weatherData}</p>
            </div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]">
              <p>{weatherData}</p>
            </div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]">
              <p>{weatherData}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
