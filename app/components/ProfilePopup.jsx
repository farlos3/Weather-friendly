import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";

const ProfilePopup = ({ isVisible, onClose, onLogout }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetch(
          "/AuthRoutes/api/GetUpdateUser/getUserProfile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile.");
        }

        setProfile({ name: data.name, email: data.email });
        setEditedName(data.name);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) fetchProfile();
  }, [isVisible]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch(
        "/AuthRoutes/api/GetUpdateUser/updateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: editedName }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to update name.");

      setProfile((prevProfile) => ({
        ...prevProfile,
        name: data.user.name,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating name:", error.message);
      alert("Failed to update name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-80 flex flex-col items-center">
        <h3 className="text-xl font-bold mb-4">โปรไฟล์ของคุณ</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-4 flex flex-col items-center">
              <img
                src="/img/Account-Icon.png"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
              <p className="mt-2 text-sm text-blue-500 cursor-pointer hover:underline">
                รูปโปรไฟล์
              </p>
            </div>

            <div className="w-full mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                ชื่อ:
              </label>
              <div className="flex items-center justify-between">
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded mr-2"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                ) : (
                  <>
                    <p className="text-gray-900">{profile.name}</p>
                    <button
                      className="text-yellow-500 hover:text-yellow-600"
                      onClick={() => setIsEditing(true)}
                    >
                      ✏️
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="w-full mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                อีเมล:
              </label>
              <p className="text-gray-900">{profile.email}</p>
            </div>
            <div className="flex justify-end space-x-2 w-full">
              {isEditing ? (
                <>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(profile.name);
                    }}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    บันทึก
                  </button>
                </>
              ) : null}
            </div>
            <div className="flex justify-between w-full mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={onClose}
              >
                ปิด
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;