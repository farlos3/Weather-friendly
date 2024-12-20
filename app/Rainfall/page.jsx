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
import { space } from "postcss/lib/list";
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

  const getWeatherImage = (rainPercentage) => {
    if (rainPercentage === null || rainPercentage === undefined) {
      return "/img/rain.png"; // Default image for no data
    }

    if (rainPercentage >= 0 && rainPercentage <= 25) {
      return "/img/lessrain.png"; // Image for 0-25%
    } else if (rainPercentage > 25 && rainPercentage <= 50) {
      return "/img/25-50.png"; // Image for 26-50%
    } else if (rainPercentage > 50 && rainPercentage <= 75) {
      return "/img/50-75.png"; // Image for 51-75%
    } else {
      return "/img/75-100.png"; // Image for 76-100%
    }
  };

  const getStyles = () => {
    const forecastValue =
      rainfallData?.WeatherForecasts?.[0]?.forecasts?.[0]?.data?.rain;

    if (forecastValue !== undefined) {
      if (forecastValue >= 0 && forecastValue <= 10) {
        return {
          backgroundImage: "url('/img/backgroundproject.gif')",
          fontColor: "rgba(7, 4, 73, 0.98)", // สีฟอนต์ดำ
        };
      } else if (forecastValue > 10 && forecastValue <= 35) {
        return {
          backgroundImage: "url('/img/bgrain0-10.gif')",
          fontColor: "#ffffff", // สีฟอนต์ขาว
        };
      } else if (forecastValue > 35 && forecastValue <= 90) {
        return {
          backgroundImage: "url('/img/backgroundproject.gif')",
          fontColor: "rgba(7, 4, 73, 0.98)", // สีฟอนต์แดง
        };
      } else if (forecastValue > 90) {
        return {
          backgroundImage: "",
          fontColor: "#ffffff", // สีฟอนต์เขียว
        };
      }
      console.log(
        rainfallData?.WeatherForecasts?.[0]?.forecasts?.[0]?.data?.rain
      );
    }
    return {
      backgroundImage: "#ffffff",
      fontColor: "#000000", // ค่าเริ่มต้น
    };
  };

  const styles = getStyles();

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
          console.log(
            "จังหวัดที่ใกล้ที่สุด:",
            nearest.name,
            "\ntype:",
            typeof nearest.name
          );
          console.log(
            "ภาคที่ใกล้ที่สุด:",
            nearest.region,
            "\ntype:",
            typeof nearest.region
          );
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
          url = `/ExternalAPI/api/weatherTMD?lat=${lat}&lon=${lon}&timeRange=${timeRange}`;
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
      className="w-full h-screen flex flex-col bg-cover"
      style={{ backgroundImage: styles.backgroundImage }}
    >
      <div className="flex justify-between items-center">
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
        <div className="inline w-full">
          <div className="flex ml-10 h-[30%]">
            <div className="w-[30%] space-y-2">
              <h1 className="text-[2.5rem] font-bold">ปริมาณฝน</h1>
              <Datetime />
              <p className="text-[1.5rem]">{isLoggedIn ? province : region}</p>

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

            <div className="flex h-full text-[16pt] items-start justify-around w-[60%] mt-[2rem]">
              <h2 className="text-3xl font-semibold w-[50%] flex flex-col items-center">
                ข้อมูลฝน{timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"}
                <img src="/img/rain.png" className="w-[10rem] h-[10rem]" />
              </h2>
              <div className="space-y-7 w-full">
                <div className="flex h-fit w-full">
                  จังหวัดที่เลือก
                  <div className="font-bold ml-3">
                    {province || "ยังไม่เลือก"}
                  </div>
                </div>
                {rainfallData?.WeatherForecasts?.[0]?.forecasts?.[0] && (
                  <div className="h-full space-y-4">
                    <div className="flex text-[2rem] items-center">
                      ปริมาณฝน
                      <div className="font-bold ml-3">
                        {rainfallData.WeatherForecasts[0].forecasts[0]?.data
                          ?.rain ?? "ไม่มีข้อมูล"}{" "}
                        มม./ชม.
                      </div>
                    </div>
                    <div className="flex">
                      <div className="flex w-[50%] items-center pr-2">
                        <img
                          src="/img/wind.png"
                          className="w-[3rem] h-[2rem] mr-4"
                        />{" "}
                        {rainfallData.WeatherForecasts[0].forecasts[0]?.data
                          ?.ws10m ?? "ไม่มีข้อมูล"}{" "}
                        เมตร/วินาที
                      </div>
                      <div className="w-[0.5%] bg-black"></div>
                      <div className="w-[30%] flex items-center pl-3">
                        <img
                          src="/img/Humidity.png"
                          className="w-[3rem] h-[3rem] mr-4"
                        />{" "}
                        {rainfallData.WeatherForecasts[0].forecasts[0]?.data
                          ?.rh ?? "ไม่มีข้อมูล"}{" "}
                        %
                      </div>
                    </div>
                    <div>ไม่มีฝนตก</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center mt-[5rem] ml-[3rem] mr-[3rem] h-[50%] gap-x-4">
            {rainfallData?.WeatherForecasts?.[0]?.forecasts
              ?.slice(1, 6)
              .map((item, index) => {
                const { data, time } = item;
                const { rain, ws10m, rh } = data || {};

                const formattedTime =
                  timeRange === "hourly"
                    ? new Date(time).toLocaleTimeString("th-TH", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : new Date(time).toLocaleDateString("th-TH", {
                        weekday: "short",
                        day: "numeric",
                      });

                return (
                  <div
                    key={index}
                    className="w-[20%] h-full bg-white rounded-[2rem] flex flex-col justify-center space-y-3 p-4"
                  >
                    <div className="text-center text-lg font-bold">
                      {formattedTime}
                      <div className="w-full h-[5%] bg-black"></div>
                    </div>

                    <div className="flex justify-center">
                      <img
                        src={getWeatherImage(rain)}
                        alt="Weather condition"
                        className="w-40 object-contain"
                      />
                    </div>

                    <div className="w-full flex justify-between">
                      <img
                        src="/img/Drizzledark.png"
                        alt=""
                        className="w-5 h-5 object-contain mr-2"
                      />
                      <div className="ml-1">{rain ?? "ไม่มีข้อมูล"} %</div>
                    </div>

                    <div className="w-full flex justify-between">
                      <img
                        src="/img/wind.png"
                        className="w-5 h-5 object-contain mr-2"
                      />
                      {ws10m ?? "ไม่มีข้อมูล"} m/s
                    </div>
                    <div className="w-full flex justify-between">
                      <img
                        src="/img/Humidity.png"
                        className="w-5 h-5 object-contain mr-2"
                      />
                      {rh ?? "ไม่มีข้อมูล"} %
                    </div>
                  </div>
                );
              })}

            <div className="w-[50%] h-full bg-white p-3 rounded-[3rem] flex justify-center items-center">
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