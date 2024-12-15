"use client";

import Navbar from "../components/Navbar";
import Headlogo from "../components/Headlogo";
import Datetime from "../components/Datetime";
import Footer from "../components/Footer";
import RegisterButton from "../components/RegisterButton";
import "/app/globals.css";

export default function Page() {
  return (
    <div
      className="bg-cover bg-center w-full h-screen flex flex-col"
      style={{ backgroundImage: "url('/img/AirBackground.gif')" }}
    >
      <div className="flex justify-between border items-center">
        <Headlogo />
        <RegisterButton />
      </div>

      <section className=" border flex justify-between  h-full w-full max-[100%]">
        <Navbar />
        <section className="flex-1 mx-6 border ">
          <header className="border flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">คุณภาพอากาศ</h1>
              <p className="text-lg font-bold">มจธ, กรุงเทพมหานคร</p>
              <p className="font-semibold">อา. 13 ตุลาคม 2567 8:00 น.</p>
            </div>
           
          </header>

          {/* Dropdowns */}
          <section className="border flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>PM 2.5</option>
                <option>PM 10</option>
                <option>Ozone</option>
              </select>
              <select className="px-4 py-2 rounded-md bg-yellow-300 focus:outline-none">
                <option>รายชั่วโมง</option>
                <option>รายวัน</option>
              </select>
            </div>
          </section>

          {/* Map */}
          <section className="mt-6">
            <div className="border rounded-lg h-60 mb-4 rounded-lg  bg-gray-200">
              <img
                src="/map-placeholder.png"
                alt="Map"
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        </section>

        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between">
            <p>ดีมาก</p>
            <div className="w-3/4 h-2 bg-gradient-to-r from-green-400 via-yellow-300 to-red-500 rounded-full"></div>
            <p>แย่</p>
          </div>

          {/* AQI List */}
          <div className="space-y-4">
            {["กรุงเทพมหานคร", "สมุทรปราการ"].map((location, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-yellow-100 p-3 rounded-md"
              >
                <div>
                  <p className="font-bold text-lg">{location}</p>
                  <p className="text-sm">PM 2.5: 35 μg/m³</p>
                  <p className="text-sm">13 ต.ค. 2024 22:00</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl">70</p>
                  <p className="text-sm">AQI</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
