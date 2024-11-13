"use client";
import React, { useState, useEffect } from "react";

export default function Datetime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  if (!time) return null; // Render nothing until `time` is available

  const daysOfWeek = [
    "วันอาทิตย์",
    "วันจันทร์",
    "วันอังคาร",
    "วันพุธ",
    "วันพฤหัสบดี",
    "วันศุกร์",
    "วันเสาร์",
  ];

  const monthsOfYear = [
    "มกราคม",
    "กุมภาพันธุ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฏาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const day = daysOfWeek[time.getDay()];
  const date = time.getDate();
  const month = monthsOfYear[time.getMonth()];
  const year = time.getFullYear();
  const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes} น.`;

  return (
    <div className="flex flex-col w-30 p-[0px] m-[15px_0_0_150px] text-[20pt] ">
      <div className="flex items-center text-[32pt] font-bold w-full">{formattedTime}</div>
      <div className="date">
        {day},{date} {month} {year}
      </div>
    </div>
  );
}
