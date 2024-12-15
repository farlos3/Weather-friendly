import React, { useState, useEffect } from "react";

const ProfilePopup = ({ isVisible, onClose, onLogout }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State สำหรับเปิด/ปิดโหมดแก้ไข
  const [editedName, setEditedName] = useState(""); // State สำหรับชื่อที่แก้ไข

  // ดึงข้อมูลโปรไฟล์จากฐานข้อมูล
  useEffect(() => {
    const fetchProfile = async () => {
      const response = {
        name: "สมชาย ใจดี", // แทนที่ด้วยข้อมูลจาก DB
        email: "somchai@example.com", // แทนที่ด้วยข้อมูลจาก DB
      };
      setProfile(response);
      setEditedName(response.name); // ตั้งค่าเริ่มต้นให้ตรงกับชื่อปัจจุบัน
    };

    if (isVisible) fetchProfile();
  }, [isVisible]);

  const handleSave = () => {
    console.log("Saving new name:", editedName); // แทนที่ด้วยการเรียก API จริง

    setProfile((prevProfile) => ({
      ...prevProfile,
      name: editedName,
    }));
    setIsEditing(false); // ปิดโหมดแก้ไข
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave(); // บันทึกเมื่อกด Enter
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-80 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">โปรไฟล์ของคุณ</h3>
        {/* รูปโปรไฟล์ */}
        <div className="mb-4 flex flex-col items-center">
          <img
            src="/img/Account-Icon.png"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-gray-300"
          />
          <p className="mt-2 text-sm text-blue-500 cursor-pointer hover:underline">
            แก้ไขรูปโปรไฟล์
          </p>
        </div>

        {/* ข้อมูลโปรไฟล์ */}
        <div className="text-center mb-4 flex items-center justify-center">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown} // กด Enter เพื่อบันทึก
              className="border px-2 py-1 rounded w-full"
              autoFocus // โฟกัสไปที่ input ทันทีเมื่อเริ่มแก้ไข
            />
          ) : (
            <>
              <h3 className="text-lg font-bold mr-2">{profile.name}</h3>
              <button
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => setIsEditing(true)} // เปิดโหมดแก้ไข
                title="Edit Username"
              >
                ✏️ {/* สัญลักษณ์แก้ไข */}
              </button>
            </>
          )}
        </div>

        {/* Email */}
        <p className="text-gray-600">{profile.email}</p>

        {/* ปุ่มปิดและ Logout */}
        <div className="flex justify-between mt-6 w-full px-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            onClick={onClose}
          >
            ปิด
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;
