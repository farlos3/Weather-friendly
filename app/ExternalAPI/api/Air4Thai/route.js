import { NextResponse } from 'next/server';
import { findNearestProvince } from "../../../utils/findNearestProvince";

// ฟังก์ชันที่ใช้กำหนดสีตาม AQI
function getColorId(aqi) {
  if (aqi <= 50) return '0'; // สีเขียว (ดีมาก)
  if (aqi <= 100) return '1'; // สีเหลือง (ดี)
  if (aqi <= 150) return '2'; // สีส้ม (ปานกลาง)
  if (aqi <= 200) return '3'; // สีแดง (ไม่ดีสำหรับกลุ่มเสี่ยง)
  if (aqi <= 300) return '4'; // สีม่วง (ไม่ดี)
  return '5'; // สีแดงเข้ม (อันตราย)
}

// ฟังก์ชันประมวลผลข้อมูลสถานีและคำนวณค่าเฉลี่ย AQI และมลพิษแต่ละประเภทต่อจังหวัด
async function groupByProvince(stations) {
  const provinceData = {};

  stations.forEach((station) => {
    const { lat, long, AQILast, forecast } = station;

    if (AQILast) {
      const province = findNearestProvince(parseFloat(lat), parseFloat(long));

      if (province) {
        const { name } = province;

        if (!provinceData[name]) {
          provinceData[name] = {
            totalAqi: 0,
            count: 0,
            region: province.region,
            stations: [],
            pollutants: {
              PM25: { total: 0, count: 0 },
              PM10: { total: 0, count: 0 },
              O3: { total: 0, count: 0 },
              CO: { total: 0, count: 0 },
              NO2: { total: 0, count: 0 },
              SO2: { total: 0, count: 0 },
            },
            totalAQI: 0,
            aqiCount: 0
          };
        }

        // เก็บข้อมูลสถานีในจังหวัด
        provinceData[name].stations.push({
          date: AQILast.date,
          time: AQILast.time,
          lat,
          long,
          forecast,
          AQILast,
        });

        // เพิ่มค่า AQI และจำนวนสถานี
        if (AQILast.AQI && AQILast.AQI.aqi !== "-1") {
          provinceData[name].totalAqi += parseFloat(AQILast.AQI.aqi);
          provinceData[name].count += 1;
          provinceData[name].totalAQI += parseFloat(AQILast.AQI.aqi);
          provinceData[name].aqiCount += 1;
        }

        // เพิ่มข้อมูลมลพิษแต่ละประเภท
        ['PM25', 'PM10', 'O3', 'CO', 'NO2', 'SO2'].forEach((pollutant) => {
          const pollutantData = AQILast[pollutant];
          if (pollutantData && pollutantData.value !== "-1") {
            provinceData[name].pollutants[pollutant].total += parseFloat(
              pollutantData.value
            );
            provinceData[name].pollutants[pollutant].count += 1;
          }
        });
      }
    }
  });

  // คำนวณค่าเฉลี่ย AQI และมลพิษแต่ละประเภทต่อจังหวัด
  const averagedData = Object.keys(provinceData).map((provinceName) => {
    const { totalAqi, count, region, stations, pollutants, totalAQI, aqiCount } = provinceData[provinceName];

    const pollutantAverages = {};
    Object.keys(pollutants).forEach((pollutant) => {
      const { total, count } = pollutants[pollutant];
      pollutantAverages[pollutant] = count > 0 ? (total / count).toFixed(2) : null;
    });

    const avgAQI = aqiCount > 0 ? (totalAQI / aqiCount).toFixed(2) : null;

    // คำนวณ color_id สำหรับ PM2.5 AQI
    const pm25Aqi = pollutants['PM25'] ? pollutants['PM25'].total / pollutants['PM25'].count : null;
    const pm25ColorId = pm25Aqi ? getColorId(pm25Aqi) : null;

    return {
      province: provinceName,
      region,
      lat: stations[0]?.lat || null, // ใช้แค่ละติจูดแรกจากสถานี
      long: stations[0]?.long || null, // ใช้แค่ลองติจูดแรกจากสถานี
      date: stations[0]?.AQILast.date || null, // วันที่จากสถานีแรก
      time: stations[0]?.AQILast.time || null, // เวลาจากสถานีแรก
      stationCount: count,
      AQI: avgAQI, // ค่า AQI เฉลี่ย
      color_id: getColorId(parseFloat(avgAQI)), // คำนวณสีจากค่า AQI เฉลี่ย
      pm25Aqi: pm25Aqi ? pm25Aqi.toFixed(2) : null, // ค่า AQI สำหรับ PM2.5
      pm25ColorId: pm25ColorId, // color_id สำหรับ PM2.5
      pollutantAverages,
    };
  });

  return averagedData; // ส่งกลับข้อมูลทั้งหมด
}

// ฟังก์ชันสำหรับรวมข้อมูลเป็นภาค
async function groupByRegion(stations) {
  const regionData = {};

  stations.forEach((station) => {
    const { lat, long, AQILast, forecast } = station;

    if (AQILast) {
      const province = findNearestProvince(parseFloat(lat), parseFloat(long));

      if (province) {
        const { region } = province;

        if (!regionData[region]) {
          regionData[region] = {
            totalAqi: 0,
            count: 0,
            pollutants: {
              PM25: { total: 0, count: 0 },
              PM10: { total: 0, count: 0 },
              O3: { total: 0, count: 0 },
              CO: { total: 0, count: 0 },
              NO2: { total: 0, count: 0 },
              SO2: { total: 0, count: 0 },
            },
            totalAQI: 0,
            aqiCount: 0,
            stations: [], // เพิ่ม stations เป็น array ว่างเมื่อสร้าง regionData[region]
          };
        }

        // ตรวจสอบว่ามี stations หรือยัง
        if (!regionData[region].stations) {
          regionData[region].stations = []; // สร้าง stations เป็น array ว่าง
        }

        // เก็บข้อมูลสถานีในภาค
        regionData[region].stations.push({
          date: AQILast.date,
          time: AQILast.time,
          lat,
          long,
          forecast,
          AQILast,
        });

        // เพิ่มค่า AQI และจำนวนสถานี
        if (AQILast.AQI && AQILast.AQI.aqi !== "-1") {
          regionData[region].totalAqi += parseFloat(AQILast.AQI.aqi);
          regionData[region].count += 1;
          regionData[region].totalAQI += parseFloat(AQILast.AQI.aqi);
          regionData[region].aqiCount += 1;
        }

        ['PM25', 'PM10', 'O3', 'CO', 'NO2', 'SO2'].forEach((pollutant) => {
          const pollutantData = AQILast[pollutant];
          if (pollutantData && pollutantData.value !== "-1") {
            regionData[region].pollutants[pollutant].total += parseFloat(
              pollutantData.value
            );
            regionData[region].pollutants[pollutant].count += 1;
          }
        });
      }
    }
  });

  // คำนวณค่าเฉลี่ย AQI และมลพิษแต่ละประเภท
  const averagedData = Object.keys(regionData).map((regionName) => {
    const { totalAqi, count, region, stations, pollutants, totalAQI, aqiCount } = regionData[regionName];

    const pollutantAverages = {};
    Object.keys(pollutants).forEach((pollutant) => {
      const { total, count } = pollutants[pollutant];
      pollutantAverages[pollutant] = count > 0 ? (total / count).toFixed(2) : null;
    });

    const avgAQI = aqiCount > 0 ? (totalAQI / aqiCount).toFixed(2) : null;

    // คำนวณ color_id สำหรับ PM2.5 AQI
    const pm25Aqi = pollutants['PM25'] ? pollutants['PM25'].total / pollutants['PM25'].count : null;
    const pm25ColorId = pm25Aqi ? getColorId(pm25Aqi) : null;

    return {
      region: regionName,
      lat: stations[0]?.lat || null, // ใช้แค่ละติจูดแรกจากสถานี
      long: stations[0]?.long || null, // ใช้แค่ลองติจูดแรกจากสถานี
      date: stations[0]?.AQILast.date || null, // วันที่จากสถานีแรก
      time: stations[0]?.AQILast.time || null, // เวลาจากสถานีแรก
      stationCount: count,
      AQI: avgAQI, // ค่า AQI เฉลี่ย
      color_id: getColorId(parseFloat(avgAQI)), // คำนวณสีจากค่า AQI เฉลี่ย
      pm25Aqi: pm25Aqi ? pm25Aqi.toFixed(2) : null, // ค่า AQI สำหรับ PM2.5
      pm25ColorId: pm25ColorId, // color_id สำหรับ PM2.5
      pollutantAverages,
    };
  });

  return averagedData; // ส่งกลับข้อมูลทั้งหมด
}


export async function GET(request) {
  const url = `http://air4thai.pcd.go.th/services/getNewAQI_JSON.php`;

  const response = await fetch(url);
  if (!response.ok) return NextResponse.json({ error: "Can't fetch data!" });

  const data = await response.json();
  const stations = data.stations;
  const { searchParams } = new URL(request.url);

  const groupType = searchParams.get("groupType");
  const provinceFilter = searchParams.get("province");
  const regionName = searchParams.get("region");

  let groupedData =
    groupType === "region"
      ? await groupByRegion(stations)
      : await groupByProvince(stations);

  // กรองข้อมูลตาม provinceFilter ถ้ามี
  if (provinceFilter) {
    groupedData = groupedData.filter((item) =>
      item.province.toLowerCase().includes(provinceFilter.toLowerCase()) // ค้นหาโดยไม่สนใจตัวพิมพ์ใหญ่
    );
  }

  // กรองข้อมูลตาม regionName ถ้ามี
  if (regionName) {
    groupedData = groupedData.filter((item) =>
      item.region.toLowerCase().includes(regionName.toLowerCase()) // ค้นหาโดยไม่สนใจตัวพิมพ์ใหญ่
    );
  }

  return NextResponse.json(groupedData);
}