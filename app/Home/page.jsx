"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterButton from "../components/RegisterButton";

export default function Home() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen flex flex-col"
        style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
      >
        <header>
          <Headlogo />
          <Navbar />
        </header>
        <div className="absolute top-0 right-0 p-4">
          <RegisterButton />
        </div>
        <Datetime />
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <div className="w-60"></div>
          </div>
        </div>
        <div className="py-8">
          <div className="container ml-[150px] ">
            <div className="grid grid-cols-3 gap-[50px] border w-max ">
              {/* today weather */}
              <div className="p-5 bg-white rounded-[25px] h-[500px] w-[300px]">
                <div>
                  <div className="p-4 flex flex-col space-y-4">
                    <p className="font-bold text-[42px]">วันนี้</p>
                    <p>อ.12</p>
                    <p>24°</p>
                    <p>มีหมอกน้ำค้าง</p>
                    <span className="flex gap-4">
                      ☀️<div className="bg-[black] w-[2px]"></div>
                      <p>3</p>
                    </span>
                    <span className="flex gap-4">
                      🌬️<div className="bg-[black] w-[2px]"></div>
                      <p>5 กม./ชม.</p>
                    </span>
                    <span className="flex gap-4">
                      💧<div className="bg-[black] w-[2px]"></div>
                      <p>86%</p>
                    </span>
                    <p className="">
                      คำแนะนำ:
                      ควรดื่มน้ำอย่างเพียงพอเพื่อลดความเสี่ยงจากสภาพอากาศที่แห้ง
                    </p>
                  </div>
                </div>
              </div>
              {/* other's day weather */}
              <div className="grid grid-cols-3 grid-rows-2 gap-5 col-span-2">
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
                <div className="bg-white rounded-[25px] p-3">
                  <p className="font-bold text-[42px]">วันนี้</p>
                  <p>อ.12</p>
                  <p>24°</p>
                  <p>มีหมอกน้ำค้าง</p>
                  <span className="flex gap-4">
                    ☀️<div className="bg-[black] w-[2px]"></div>
                    <p>3</p>
                  </span>
                  <span className="flex gap-4">
                    🌬️<div className="bg-[black] w-[2px]"></div>
                    <p>5 กม./ชม.</p>
                  </span>
                  <span className="flex gap-4">
                    💧<div className="bg-[black] w-[2px]"></div>
                    <p>86%</p>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="grid grid-row-2 ">
          <h3 className="text-xl absolute top-[60px] right-2 font-bold">
            ประเทศไทย
          </h3>
          <div className="absolute top-[100px] right-2 w-[500px] h-full max-h-[700px] border p-4"></div>
        </div>
        <div></div>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}
