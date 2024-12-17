import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format') || 'json';
  const uid ='api';
  const ukey ='api12345';

  const url = `https://data.tmd.go.th/api/WeatherForecast7DaysByRegion/v2/?uid=${uid}&ukey=${ukey}&format=${format}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
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
