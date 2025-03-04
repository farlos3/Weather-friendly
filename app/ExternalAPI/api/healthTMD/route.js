import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const province = searchParams.get('province');
  const region = searchParams.get('region');
  const TMD_ACCESS_TOKEN = process.env.TMD_ACCESS_TOKEN;

  // Validate required parameters
  if (!province && !region) {
    return NextResponse.json(
      { error: 'You must specify either "province" or "region" as a query parameter' },
      { status: 400 }
    );
  }

  // Define fields and duration
  const fields = 'tc_max,tc_min,tc,rh,slp,rain,ws10m,wd10m,cloudlow,cloudmed,cloudhigh,cond';
  const duration = 12;

  // Construct API URL
  const endpoint = province 
    ? `place?province=${encodeURIComponent(province)}`
    : `region?region=${encodeURIComponent(region)}`;
  const url = `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/${endpoint}&fields=${fields}&duration=${duration}`;

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${TMD_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();

    // Handle response
    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: data.message || 'Unknown error' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('Error fetching TMD data:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch TMD data' },
      { status: 500 }
    );
  }
}
