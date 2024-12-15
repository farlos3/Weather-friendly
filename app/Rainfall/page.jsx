import React from "react";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterButton from "../components/RegisterButton";

export default function page() {
  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
    >
      <div className="flex justify-between border items-center">
        <Headlogo />
        <RegisterButton />
      </div>
      <div className="flex h-full max-[100%]">
        <Navbar />

        <div className="inline w-full border-4 border-blue-500/75">
          <div className="flex ml-10 h-[30%] border-4 border-red-500/75">
            <div className="w-[30%] border-4 border-black">
              <h1 className="text-[2.5rem] font-bold">ปริมาณฝน</h1>
              <Datetime />
              <p className="text-[1.5rem]">ภาคกลาง</p>
            </div>

            <div className="border-4 border-indigo-500/75 w-[70%] h-full max-[100%]">
              ใส่ข้อมูลปริมาณฝนตรงนี้
            </div>
          </div>
          <div className=" flex items-center ml-[2.5rem] h-[70%] gap-x-4 border-4 border-red-500">
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">ปริมาณฝนรายชั่วโมง</div>
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">ปริมาณฝนรายชั่วโมง</div>
            <div className="w-[20%] h-[70%] border-4 border-yellow-500">ปริมาณฝนรายชั่วโมง</div>
            <div className="w-full h-[70%] border-4 border-yellow-500">กราฟฝนรายชั่วโมง</div>

          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
