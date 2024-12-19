"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { findNearestProvince } from "../utils/findNearestProvince";
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

const HealthAdvice = ({ weatherData }) => {
  const getHealthAdvice = (temp, humidity) => {
    const advices = [];

    if (temp > 35) {
      advices.push({
        severity: "high",
        advice:
          "ระวังภาวะร้อนจัด ควรหลีกเลี่ยงการอยู่กลางแจ้ง ดื่มน้ำให้เพียงพอ",
      });
    } else if (temp > 32) {
      advices.push({
        severity: "medium",
        advice:
          "อากาศค่อนข้างร้อน ควรดื่มน้ำให้เพียงพอและหลีกเลี่ยงกิจกรรมกลางแจ้ง",
      });
    }

    if (humidity > 80) {
      advices.push({
        severity: "medium",
        advice: "ความชื้นสูง ระวังการเกิดเชื้อรา ควรอยู่ในที่อากาศถ่ายเทสะดวก",
      });
    } else if (humidity < 30) {
      advices.push({
        severity: "medium",
        advice: "อากาศแห้ง ควรดูแลผิวและดื่มน้ำให้เพียงพอ",
      });
    }

    return advices;
  };

  const advice = getHealthAdvice(weatherData?.data?.tc, weatherData?.data?.rh);

  return (
    <div className="space-y-6">
      {/* Health Advice Section */}
      <div className="bg-blue-50/90 rounded-lg shadow-md">
        <div className="p-4 border-b border-blue-100">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-amber-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            คำแนะนำด้านสุขภาพ
          </h2>
        </div>
        <div className="p-4">
          {advice.length > 0 ? (
            <ul className="space-y-3">
              {advice.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 p-4 rounded-lg ${
                    item.severity === "high"
                      ? "bg-red-100/80"
                      : "bg-yellow-100/80"
                  }`}
                >
                  <span className="text-base">{item.advice}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center p-4">
              สภาพอากาศเหมาะสม ไม่มีคำแนะนำพิเศษ
            </p>
          )}
        </div>
      </div>

      {/* Health Warnings Section */}
      <div className="bg-red-50/90 rounded-lg shadow-md">
        <div className="p-4 border-b border-red-100">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            โปรดระวังอาการเหล่านี้
          </h2>
        </div>
        <div className="p-4">
          <ul className="space-y-3">
            {weatherData?.data?.tc > 35 && (
              <>
                <li className="flex items-start gap-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span>อาการวิงเวียนศีรษะ หน้ามืด</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span>ปวดศีรษะ คลื่นไส้</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span>ผิวแห้ง กระหายน้ำ</span>
                </li>
              </>
            )}
            {weatherData?.data?.rh > 80 && (
              <>
                <li className="flex items-start gap-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span>หายใจลำบาก</span>
                </li>
                <li className="flex items-start gap-2 p-3 bg-white/50 rounded-lg">
                  <span className="text-red-600">•</span>
                  <span>ระคายเคืองผิวหนัง</span>
                </li>
              </>
            )}
            {!(weatherData?.data?.tc > 35 || weatherData?.data?.rh > 80) && (
              <p className="text-gray-600 text-center p-4">
                ไม่พบความเสี่ยงที่ต้องระวังเป็นพิเศษ
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [province, setProvince] = useState("");
  const [region, setRegion] = useState("");
  const [timeRange, setTimeRange] = useState("daily");
  const [forecasts, setForecasts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
      setTokenExpiry();
      console.log("Already Token");
    } else {
      console.log("Not yet Token");
    }
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

  useEffect(() => {
    async function fetchWeather() {
      try {
        const province = "กรุงเทพมหานคร";
        const response = await fetch(
          `/ExternalAPI/api/healthTMD?province=${encodeURIComponent(province)}`
        );

        const data = await response.json();
        setForecasts(data.WeatherForecasts[0]?.forecasts || []);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลได้");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div
      className="h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b px-4 py-2">
        <Headlogo />
        {isLoggedIn ? (
          <div className="flex items-center space-x-4 relative">
            <p className="text-gray-700">ยินดีต้อนรับ</p>
            <img
              src="/img/Account-Icon.png"
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition-colors"
              onClick={handleProfileClick}
            />
            <div className="absolute top-full right-0 mt-2">
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

      {/* Main Content */}
      <div className="flex flex-1">
        <Navbar />
        <main className="flex-1 p-6">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">{error}</div>
          ) : forecasts.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">ภาคกลาง</h1>
                <Datetime />
              </div>

              {/* Row with Current Weather and Health Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Weather */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-yellow-100/90 to-yellow-200/90 rounded-2xl p-6 shadow-lg h-full">
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <p className="text-gray-600 mb-4">
                          {new Date(forecasts[0].time).toLocaleString("th-TH")}
                        </p>
                        <div className="text-6xl font-bold text-gray-800 mb-4">
                          {forecasts[0].data.tc}°C
                        </div>
                        <div className="text-3xl text-gray-600 mb-6">
                          {forecasts[0].data.cond === 1
                            ? "ท้องฟ้าแจ่มใส"
                            : "มีเมฆมาก"}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/50 rounded-lg p-4">
                          <p className="text-sm text-gray-600">ความชื้น</p>
                          <p className="text-2xl font-semibold">
                            {forecasts[0].data.rh}%
                          </p>
                        </div>
                        <div className="bg-white/50 rounded-lg p-4">
                          <p className="text-sm text-gray-600">ความเร็วลม</p>
                          <p className="text-2xl font-semibold">
                            {forecasts[0].data.ws10m} m/s
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Information Column */}
                <div className="lg:col-span-1">
                  <HealthAdvice weatherData={forecasts[0]} />
                </div>
              </div>

              {/* Forecast Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {forecasts.slice(1, 7).map((forecast, index) => (
                  <div
                    key={index}
                    className="bg-white/90 rounded-xl p-4 shadow-md"
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      {new Date(forecast.time).toLocaleString("th-TH", {
                        weekday: "short",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {forecast.data.tc}°C
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <p>ความชื้น: {forecast.data.rh}%</p>
                      <p>ความเร็วลม: {forecast.data.ws10m} m/s</p>
                      <p>
                        {forecast.data.cond === 1
                          ? "ท้องฟ้าแจ่มใส"
                          : "มีเมฆมาก"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              ไม่มีข้อมูลพยากรณ์อากาศ
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
