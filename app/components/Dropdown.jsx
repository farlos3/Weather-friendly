// "use client";

// import { useState, useEffect } from "react";

// export default function Dropdown({ isLoggedIn, zoomToRegion }) {
//   const [selected, setSelected] = useState(null); // เก็บค่าที่เลือก
//   const [isOpen, setIsOpen] = useState(false); // จัดการเปิด/ปิด Dropdown
//   const [options, setOptions] = useState({}); // เก็บตัวเลือก (Region/Province)

//   const regions = [
//     { code: 'C', name: 'ภาคกลาง', lat: 13.7563, lng: 100.5018 },
//     { code: 'N', name: 'ภาคเหนือ', lat: 18.7877, lng: 99.1508 },
//     { code: 'NE', name: 'ภาคตะวันออกเฉียงเหนือ', lat: 15.2294, lng: 102.0975 },
//     { code: 'E', name: 'ภาคตะวันออก', lat: 12.78, lng: 101.3565 },
//     { code: 'S', name: 'ภาคใต้', lat: 7.0083, lng: 100.2939 },
//     { code: 'W', name: 'ภาคตะวันตก', lat: 11.81136, lng: 99.797974 },
//   ];  

//   const provinces = {
//     "เชียงใหม่": { lat: 18.7883, lng: 98.9853 },
//     "กรุงเทพ": { lat: 13.7563, lng: 100.5018 },
//     "ชลบุรี": { lat: 13.3611, lng: 100.9847 },
//     "ภูเก็ต": { lat: 7.8804, lng: 98.3923 },
//   };

//   useEffect(() => {
//     setOptions(isLoggedIn ? provinces : regions); // ใช้ Province/Region ตามสถานะ Login
//   }, [isLoggedIn]);

//   const toggleDropdown = () => setIsOpen(!isOpen); // จัดการเปิด/ปิด Dropdown

//   const handleSelect = (key) => {
//     setSelected(key);
//     const { lat, lng } = options[key];
//     zoomToRegion(lat, lng); // ซูมแผนที่ไปยังตำแหน่งที่เลือก
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <button
//         onClick={toggleDropdown}
//         className="flex w-[15rem] justify-between rounded-md border px-4 py-2 bg-white shadow-sm"
//       >
//         {selected || (isLoggedIn ? "เลือกจังหวัด" : "เลือกภาค")}
//         <img
//           className="-mr-1 ml-2 h-5 w-5"
//           src="https://cdn-icons-png.flaticon.com/128/25/25243.png"
//           alt="Dropdown Icon"
//         />
//       </button>

//       {isOpen && (
//         <div className="z-10 mt-2 w-[15rem] rounded-md bg-white shadow-lg">
//           {Object.keys(options).map((key) => (
//             <div
//               key={key}
//               onClick={() => handleSelect(key)}
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//             >
//               {key}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
