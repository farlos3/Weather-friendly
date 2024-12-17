import React from "react";

const Dropdown = ({
  isLoggedIn,
  provinces,
  regions,
  province,
  region,
  setProvince,
  setRegion,
  timeRange,
  setTimeRange, // State สำหรับ "รายวัน" และ "รายชั่วโมง"
  zoomToRegion,
  onChangeFetchData, // ฟังก์ชัน fetch ข้อมูล
}) => {
  // ฟังก์ชันเปลี่ยนจังหวัด
  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
    if (onChangeFetchData) {
      onChangeFetchData(selectedProvince, "province");
    }
  };

  // ฟังก์ชันเปลี่ยนภาค
  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    if (onChangeFetchData) {
      onChangeFetchData(selectedRegion, "region");
    }
  };

  // ฟังก์ชันเปลี่ยนช่วงเวลา (รายวัน/รายชั่วโมง)
  const handleTimeRangeChange = (event) => {
    const selectedTimeRange = event.target.value;
    setTimeRange(selectedTimeRange);
    if (onChangeFetchData) {
      onChangeFetchData(selectedTimeRange, "timeRange");
    }
  };

  return (
    <div className="mt-4 mb-4 flex flex-col gap-4">
      {/* Dropdown สำหรับจังหวัด */}
      {isLoggedIn && (
        <select
          value={province}
          onChange={handleProvinceChange}
          className="w-[30%] px-4 py-2 text-gray-700 bg-white border rounded-lg"
        >
          <option value="">-- เลือกจังหวัด --</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      )}

      {/* Dropdown สำหรับภาค */}
      {!isLoggedIn && (
        <select
          value={region}
          onChange={handleRegionChange}
          className="w-[30%] px-4 py-2 text-gray-700 bg-white border rounded-lg"
        >
          <option value="">-- เลือกภาค --</option>
          {Object.keys(regions).map((regionKey) => (
            <option key={regionKey} value={regionKey}>
              {regions[regionKey]}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Dropdown;