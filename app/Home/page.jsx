"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterButton from "../components/RegisterButton";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div
        className="bg-cover bg-center w-full h-screen flex flex-col absolute top-0 z-0"
        style={{ backgroundImage: "url('/img/backgroundproject.gif')" }}
      >
        <header className="z-10 flex flex-row relative w-full justify-between">
          <Headlogo />

          <div className="z-10 relative flex flex-col">
            <RegisterButton className="flex flex-row" />
            <h3 className="text-xl relative font-bold py-3 self-end pr-[10px]">
              ประเทศไทย
            </h3>
          </div>
        </header>
        <Navbar />
        {/* grid of content */}
        <div className="grid  grid-cols-3 grid-rows-2 gap-4 h-full">
          <div className="col-span-2 ml-[150px] h-max">
            <Datetime />
            {/* dropdown section */}
            <div className="h-[60px] bg-white rounded-[15px] w-[400px] mt-2"></div>
            {/* dropdown section */}
          </div>
          {/* Map section */}
          <div className="grid-rows-subgrid gap-4 row-span-2 pr-[10px] h-[710px]">
            <div className="border-[2px] rounded-[25px] h-full"></div>
          </div>
          {/* Map section */}

          {/* weather section */}
          <div className="mt-[-190px] mr-[100px] ml-[150px] space-y-5 self-start bg-white rounded-[25px] p-10 h-max">
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
            <p>
              คำแนะนำ:
              ควรดื่มน้ำอย่างเพียงพอเพื่อลดความเสี่ยงจากสภาพอากาศที่แห้ง
            </p>
          </div>
          <div className="mt-[-210px] ml-[-100px] self-start">
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              <div className="bg-white rounded-[25px] p-6">
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
              <div className="bg-white rounded-[25px] p-6">
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
              <div className="bg-white rounded-[25px] p-6">
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
              <div className="bg-white rounded-[25px] p-6">
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
              <div className="bg-white rounded-[25px] p-6">
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
              <div className="bg-white rounded-[25px] p-6">
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
          {/* weather section */}
        </div>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
