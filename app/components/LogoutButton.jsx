"use client";

export default function LogoutButton() {
  return (
    <div className="flex space-x-2 z-10 items-center justify-end border w-max h-max mr-[1rem]">
      <img
        src="/img/Profile-Icon.png" // แก้ไขให้เป็นรูปโปรไฟล์ที่คุณต้องการ
        alt="Profile"
        style={{ width: "8%", height: "auto" }}
        className="cursor-pointer hover:opacity-80"
      />
    </div>
  );
}