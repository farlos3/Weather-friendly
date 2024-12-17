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
          "/AuthRoutes/api/GetUpdateDeleteUser/getUserProfile",
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
        "/AuthRoutes/api/GetUpdateDeleteUser/updateUser",
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีผู้ใช้นี้? การลบนี้จะไม่สามารถย้อนกลับได้"
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("No token found. Please log in.");

      const response = await fetch(
        "/AuthRoutes/api/GetUpdateDeleteUser/deleteUser",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to delete account.");

      alert("บัญชีผู้ใช้ของคุณถูกลบเรียบร้อยแล้ว");
      onLogout();
    } catch (error) {
      console.error("Error deleting account:", error.message);
      alert("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-0 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in">
        <div className="bg-blue-50 p-6 border-b border-blue-100">
          <h3 className="text-2xl font-semibold text-blue-800 text-center">
            โปรไฟล์ของคุณ
          </h3>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src="/img/Account-Icon.png"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md"
                />
              </div>
              <p className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer">
                รูปโปรไฟล์
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  ชื่อ:
                </label>
                <div className="flex items-center">
                  {isEditing ? (
                    <input
                      type="text"
                      id="name"
                      className="flex-grow p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <>
                      <p className="flex-grow text-gray-900">{profile.name}</p>
                      <button
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                        onClick={() => setIsEditing(true)}
                      >
                        ✏️
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  อีเมล:
                </label>
                <p className="text-gray-900 bg-gray-50 p-2 rounded-md">
                  {profile.email}
                </p>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedName(profile.name);
                  }}
                >
                  ยกเลิก
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={handleSave}
                  disabled={loading}
                >
                  บันทึก
                </button>
              </div>
            )}

            <div className="mt-6 grid grid-cols-3 gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={onClose}
              >
                ปิด
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={handleDelete}
                disabled={loading}
              >
                ลบบัญชีผู้ใช้
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                onClick={onLogout}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePopup;