import React, { useState, useEffect } from "react";

const ProfilePopup = ({ isVisible, onClose, onLogout, userId }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null); // State to hold the new picture

  // Fetch the current profile data when the popup is visible
  useEffect(() => {
    const fetchProfile = async () => {
      const response = {
        name: "สมชาย ใจดี",
        email: "somchai@example.com",
        profilePicture: "data:image/png;base64,YOUR_BASE64_ENCODED_IMAGE_HERE",
      };
      setProfile(response);
    };

    if (isVisible) fetchProfile();
  }, [isVisible]);

  // Handle image upload
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the image to base64 (or you can send it directly as FormData)
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;
        setNewProfilePicture(base64Image); // Update state with the new base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async () => {
    if (!newProfilePicture) return;

    const response = await fetch(`/api/auth/updateProfile/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profilePicture: newProfilePicture,
      }),
    });

    if (response.ok) {
      // Handle success, update profile state
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: newProfilePicture,
      }));
      alert("Profile picture updated!");
    } else {
      alert("Failed to update profile picture.");
    }
  };

  return (
    <div className="popup-container">
      <h3>Update Profile Picture</h3>
      <div className="profile-info">
        <img
          src={profile.profilePicture || "/img/Account-Icon.png"}
          alt="Profile"
          className="profile-picture"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        <button onClick={handleProfileUpdate}>Save Profile Picture</button>
      </div>
    </div>
  );
};

export default ProfilePopup;
