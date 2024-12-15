"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css";
import { useState } from "react";

export default function Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("กรุงเทพมหานคร");

  const provinces = [
    "กรุงเทพมหานคร",
    "สมุทรปราการ",
    "นนทบุรี",
    "ปทุมธานี",
    "นครปฐม",
    "ชลบุรี",
    "ระยอง",
  ];

  // กรองจังหวัดตามข้อความที่ผู้ใช้พิมพ์
  const filteredProvinces = provinces.filter((province) =>
    province.includes(searchText)
  );

  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/AirBackground.gif')" }}
    >
      <div className="flex justify-between border items-center">
        <Headlogo />
        <RegisterButton />
      </div>

      <section className=" border flex h-full w-full max-[100%]">
        <Navbar />
        <section className="flex-1 border w-full max-[100%] mx-6 ">
          <header className="border flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">คุณภาพอากาศ</h1>
              <Datetime />
              <h2 className="text-2xl ">มจธ, กรุงเทพมหานคร</h2>
            </div>
          </header>

          {/* Dropdowns */}
          <section className="border flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>PM 2.5</option>
                <option>PM 10</option>
                <option>Ozone</option>
              </select>
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>รายชั่วโมง</option>
                <option>รายวัน</option>
              </select>
            </div>
          </section>

          {/* Map */}
          <section className="mt-6">
            <div className="border rounded-lg h-80 mb-4 rounded-lg bg-gray-200">
              <img
                src="/map-placeholder.png"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </section>

        <div className=" border h-full max-[100%] mx-6 w-1/3 p-4 space-y-4 ">
          {/* Legend */}
          <div className="flex items-center justify-between p-4">
            <p>ดีมาก</p>
            <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-full"></div>
            <p>แย่</p>
          </div>

          {/* Search Bar and Dropdown */}
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="ค้นหาจังหวัด หรือ จุดสถานี"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />

            {isDropdownOpen && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto w-full">
                {filteredProvinces.map((province, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedProvince(province);
                      setSearchText(province);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                  >
                    {province}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AQI List */}
          <div className="bg-yellow-300 rounded-lg border w-full p-4 space-y-4 ">
            {["กรุงเทพมหานคร", "สมุทรปราการ", "นนทบุรี", "ปทุมธานี"].map(
              (location, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white p-3 rounded-md"
                >
                  <div>
                    <p className="font-bold text-lg">{location}</p>
                    <p className="text-sm">PM 2.5: 35 μg/m³</p>
                    <p className="text-sm">13 ต.ค. 2024 22:00</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-2xl">70</p>
                    <p className="text-sm">AQI</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
