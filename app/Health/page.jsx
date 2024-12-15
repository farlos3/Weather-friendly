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
        <div className="ml-10 inline w-full border">
          <div className="flex h-[60%] border">
            <div className="h-full w-[40%] border">
              <h3 className="text-[3rem] font-bold">ภาคกลาง</h3>
              <Datetime />
              <div className="w-full h-[60%] border"></div>
            </div>
            <div className="w-[60%] h-full border">
              <div className="w-full h-[50%] border">
                <div className="mt-[1rem] flex justify-start items-center ml-4 p-4 rounded-[2rem] w-max h-[20%] text-white font-bold bg-[#185ADB] shadow-[0px_0px_10px_2px_#11121374]">
                  คำแนะนำด้านสุขภาพ
                </div>
                <div className="mt-[1rem] ml-4 bg-white shadow-[0px_0px_15px_1px_#11121374] w-[60%] h-[60%] rounded-[1.5rem]"></div>
              </div>
              <div className="w-full h-[50%] space-y-4">
                <div className="mt-[1rem] flex justify-start items-center ml-4 p-4 rounded-[2rem] w-max h-[20%] text-black font-bold bg-[#FFC947] shadow-[0px_0px_10px_2px_#11121374]">
                  คำแนะนำด้านสุขภาพ
                </div>
                <div className="flex flex-wrap justify-evenly items-center border h-max">
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                  <div className="border w-[30%] h-[4rem] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap  p-4 gap-x-4 justify-evenly h-[40%]">
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
            <div className="border w-[20%] rounded-[1.5rem] bg-[#FFF0E3] shadow-[0px_0px_15px_1px_#11121374]"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
