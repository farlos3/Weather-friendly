import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const province = searchParams.get('province');
  const region = searchParams.get('region');
  const lat = searchParams.get('lat');  // รับค่าพิกัด lat
  const lon = searchParams.get('lon');  // รับค่าพิกัด lon
  const timeRange = searchParams.get('timeRange'); // รับ timeRange (hourly/daily)
  const TMD_ACCESS_TOKEN = process.env.TMD_ACCESS_TOKEN;

  // เช็คหากไม่มีทั้ง province และ lat, lon
  if (!province && !region && (!lat || !lon)) {
    return NextResponse.json(
      { error: 'Province or coordinates (lat, lon) are required' },
      { status: 400 }
    );
  }
  
  // ตรวจสอบ timeRange: ค่า default คือ 'daily'
  const isHourly = timeRange === 'hourly';
  const fields = 'tc_max,tc_min,tc,rh,slp,rain,ws10m,wd10m,cloudlow,cloudmed,cloudhigh,cond';
  const duration = isHourly ? 7 : 7; // ถ้าเป็น hourly ใช้ duration 6, ถ้า daily ใช้ 12

  let url;
  if (province) {
    // ใช้ province
    url = isHourly
      ? `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/place?province=${encodeURIComponent(province)}&fields=${fields}&duration=${duration}`
      : `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/place?province=${encodeURIComponent(province)}&fields=${fields}&duration=${duration}`;
    console.log(`\nUSE with province (${isHourly ? "hourly" : "daily"})\n`);
  } else if (lat && lon) {
    // ใช้ lat, lon ถ้าไม่มี province
    url = isHourly
      ? `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/at?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&fields=${fields}&duration=${duration}`
      : `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&fields=${fields}&duration=${duration}`;
    console.log(`\nUSE with latitude, longitude (${isHourly ? "hourly" : "daily"})\n`);
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${TMD_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: data.message || 'Unknown error' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error fetching TMD data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TMD data' },
      { status: 500 }
    );
  }
}
