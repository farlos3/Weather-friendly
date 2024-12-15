"use client";

import { useState } from "react";

export default function Dropdown({ zoomToRegion }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // ข้อมูลพิกัดของแต่ละภาค
  const regions = {
    ภาคเหนือ: { lat: 18.7877, lng: 99.1508 },
    ภาคกลาง: { lat: 13.7563, lng: 100.5018 },
    ภาคตะวันออก: { lat: 12.78, lng: 101.3565 },
    ภาคตะวันตก: { lat: 11.811360, lng: 99.797974 },
    ภาคใต้: { lat: 7.0083, lng: 100.2939 },
    ภาคอีสาน: { lat: 15.2294, lng: 102.0975 },
  };

  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ฟังก์ชันที่ถูกเรียกเมื่อเลือกภาคจาก dropdown
  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    const { lat, lng } = regions[region];
    zoomToRegion(lat, lng); // เรียกฟังก์ชัน zoomToRegion ที่ส่งมาจาก Home
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="flex w-[15rem] justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          {selectedRegion ? selectedRegion : "เลือกภาค"}
          <img
            className="-mr-1 ml-2 h-5 w-5"
            src="https://cdn-icons-png.flaticon.com/128/25/25243.png"
            alt="Dropdown Icon"
          />
        </button>
      </div>

      {isOpen && (
        <div className="z-10 mt-2 w-[15rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {Object.keys(regions).map((region) => (
              <a
                key={region}
                onClick={() => handleRegionSelect(region)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {region}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
