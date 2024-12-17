import React from "react";

const Dropdown = ({
  isLoggedIn,
  provinces,
  regions,
  province,
  region,
  setProvince,
  setRegion,
  zoomToRegion,
  onChangeFetchData, // ฟังก์ชันสำหรับ fetch ข้อมูลเมื่อมีการเปลี่ยนค่า
}) => {
  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
    if (onChangeFetchData) {
      onChangeFetchData(selectedProvince, "province");
    }
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    if (onChangeFetchData) {
      onChangeFetchData(selectedRegion); // เรียกฟังก์ชันจาก props
    }
  };
  

  return (
    <div className="mt-4 mb-4">
      {isLoggedIn ? (
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
      ) : (
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
