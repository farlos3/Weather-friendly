import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const province = searchParams.get('province');
  const region = searchParams.get('region');
  const lat = searchParams.get('lat');  // รับค่าพิกัด lat
  const lon = searchParams.get('lon');  // รับค่าพิกัด lon
  const TMD_ACCESS_TOKEN = process.env.TMD_ACCESS_TOKEN;

  // เช็คหากไม่มีทั้ง province และ lat, lon
  if (!province && !region && (!lat || !lon)) {
    return NextResponse.json(
      { error: 'Province or coordinates (lat, lon) are required' },
      { status: 400 }
    );
  }

  const fields = 'tc,rh,slp,rain,ws10m,wd10m,cloudlow,cloudmed,cloudhigh,cond';
  const duration = 12;

  let url;
  if (province) {
    // ใช้ province
    url = `https://data.tmd.go.th/nwpapi/v1/forecast/location/place?province=${encodeURIComponent(province)}&fields=${fields}&duration=${duration}`;
  } else if (lat && lon) {
    // ใช้ lat, lon ถ้าไม่มี province
    url = `https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/at?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&fields=${fields}&duration=${duration}`;
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
