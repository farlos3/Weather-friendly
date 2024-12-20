"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { findNearestProvince } from "../utils/findNearestProvince";

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
    /* ---------------------------- Token and State login  ---------------------------- */
  }

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
    <div className="h-screen bg-[#1a237e] flex">
      {/* Use existing Navbar component */}
      <div className="w-24 bg-[#0d1442]">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header with existing components */}
        <div className="flex justify-between items-center text-white mb-6">
          <Headlogo />
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <p className="text-sm">ยินดีต้อนรับ</p>
              <div className="relative">
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
            </div>
          ) : (
            <RegisterButton />
          )}
        </div>

        {/* Content Area */}
        <div className="text-white">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">ภาคกลาง</h1>
            <Datetime />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[400px,1fr] gap-6">
            {/* Current Weather Card */}
            <div className="bg-gradient-to-br from-yellow-100/90 to-yellow-200/90 rounded-2xl p-6 text-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-5xl font-bold">31°C</div>
                  <div className="text-3xl mt-2">27°C</div>
                </div>
                <img src="/img/partly-cloudy.png" alt="Weather" className="w-24 h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <img src="/img/rain.png" alt="Rain" className="w-6 h-6" />
                  <span>200 มิลลิเมตร</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/img/sun.png" alt="UV" className="w-6 h-6" />
                  <span>5</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/img/wind.png" alt="Wind" className="w-6 h-6" />
                  <span>5 กิโลเมตร/ชั่วโมง</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/img/humidity.png" alt="Humidity" className="w-6 h-6" />
                  <span>86%</span>
                </div>
              </div>
            </div>

            {/* Health Recommendations */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-blue-300">คำแนะนำด้านสุขภาพ</h2>
              <div className="bg-white/90 rounded-xl p-4 text-gray-800">
                <ul className="space-y-2">
                  <li>1. ควรสวมใส่หน้ากากอนามัยเมื่อออกจากบ้าน</li>
                  <li>2. ดื่มน้ำมาก ๆ เพื่อรักษาอุณหภูมิในร่างกาย</li>
                  <li>3. หากมีอาการอ่อนเพลีย ให้หลีกเลี่ยงกิจกรรมกลางแดด</li>
                </ul>
              </div>

              <h3 className="font-medium mt-6 mb-2">โปรดระวังอาการเหล่านี้</h3>
              <div className="flex space-x-4">
                <div className="bg-white/90 rounded-xl px-4 py-2 text-gray-800">อีสโรค</div>
                <div className="bg-white/90 rounded-xl px-4 py-2 text-gray-800">ไข้อาทแดด</div>
                <div className="bg-white/90 rounded-xl px-4 py-2 text-gray-800">มะเร็งผิวหนัง</div>
              </div>
            </div>
          </div>

          {/* Forecast Cards */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {['จันทร์ 14 ตุลาคม 2567', 'อังคาร 15 ตุลาคม 2567', 'พุธ 16 ตุลาคม 2567', 'พฤหัสบดี 17 ตุลาคม 2567'].map((date, index) => (
              <div key={index} className="bg-white/90 rounded-xl p-4">
                <p className="text-gray-600 text-sm mb-2">{date}</p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-800">
                    <div className="text-2xl font-bold">32°C</div>
                    <div className="text-xl">27°C</div>
                  </div>
                  <img src="/img/cloudy.png" alt="Weather" className="w-12 h-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}