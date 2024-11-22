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
        <div className="flex justify-between border items-center">
          <Headlogo />
          <Navbar />
          <RegisterButton />
        </div>
        
        <Datetime />
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <div className="w-60"></div>
          </div>
        </div>
        <div className="py-8">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:gid-cols-4 gap-8">
              {/* today weather */}
              {/* <div className="py-10 p-5 bg-white rounded-[25px] relative h-[400px] flex items-start ">
                <div>
                  <div className="mb-4">
                    <p className="font-bold text-[42px]">วันนี้</p>
                    <p>อ.12</p>
                    <p>24°</p>
                    <p>มีหมอกน้ำค้าง</p>
                    <span className="flex gap-4">☀️<div className="bg-[black] w-[2px]"></div><p>3</p></span>
                    <span className="flex gap-4">🌬️<p>5 กม./ชม.</p></span>
                    <span className="flex">💧<p>86%</p></span>
                    <p className="">
                      คำแนะนำ:
                      ควรดื่มน้ำอย่างเพียงพอเพื่อลดความเสี่ยงจากสภาพอากาศที่แห้ง
                    </p>
                  </div>
                </div>
              </div> */}
              {/* other's day weather */}
              <div></div>
            </div>
          </div>
          <div></div>
        </div>

        <div className="grid grid-row-2 ">
          <h3 className="text-xl absolute top-7 right-2 font-bold">
            ประเทศไทย
          </h3>
          <div className=" absolute  top-20 right-2 w-[500px] h-full max-h-[700px] border"></div>
        </div>
        <div></div>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </>
  );
}