import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // อย่าลืมเพิ่ม CSS ของ Swiper

export default function SevenDaysForecast({ sevenDaysForecastData }) {
  return sevenDaysForecastData ? (
    <div className="space-y-4">
      <h3 className="inline text-xl font-bold">พยากรณ์อากาศรวม 7 วัน</h3>
      <div className="mt-4">
        <p>{sevenDaysForecastData.OverallForecast.Date}</p>
        <p>{sevenDaysForecastData.OverallForecast.OverallDescriptionThai}</p>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
      >
        {sevenDaysForecastData.OverallForecast.RegionForecast.map(
          (region, index) => (
            <SwiperSlide key={index}>
              <div className="p-4 border rounded-lg shadow-sm bg-white">
                <h3 className="font-bold text-lg">{region.RegionNameThai}</h3>
                <p className="text-gray-700">{region.DescriptionThai}</p>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  ) : (
    <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
  );
}