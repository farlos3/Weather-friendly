"use client";

import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RegisterButton from "../components/RegisterButton";

export default function Home() {
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
        <div className="flex justify-between border w-full max-[100%]">
          <div className="ml-10 w-full max-[100%]">
            <Datetime />
            <div className="mt-[2rem] mb-[2rem] w-[20rem] h-[3rem] border"></div>
            <div className="flex border-4 border-indigo-500/100 gap-4">
              <div className="w-[60%] border">ใช้แสดง API</div>
              <div className="border-4 border-indigo-500/100 flex flex-wrap justify-center ml-[0rem] gap-x-[2rem] gap-y-[2rem] ">
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
                <div className="border-4 border-indigo-500/100 w-[10rem] h-[10rem]"></div>
              </div>
            </div>
            <div className="mt-[2rem] nb-[2rem] w-full h-[20%] border"></div>
          </div>
          <div className="flex flex-col items-end border w-[50%]">
            <h3 className="text-[2rem] font-bold">ประเทศไทย</h3>
            <div className="border"></div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
