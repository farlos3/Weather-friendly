// app/api/weather/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const province = searchParams.get('province');
    const TMD_ACCESS_TOKEN = process.env.TMD_ACCESS_TOKEN;
  
    if (!province) {
      return new Response(JSON.stringify({ error: 'Province name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const fields = 'tc,rh,slp,rain,ws10m,wd10m,cloudlow,cloudmed,cloudhigh,cond';
    const currentDate = new Date().toISOString().split('T')[0];
    const currentHour = new Date().getHours();
    const duration = 2; // ระยะเวลา 2 ชั่วโมง
  
    // encodeURIComponent เพราะว่า ถ้าเป็นอักขระพิเศษหรือค่าที่ไม่ใช่ภาษาอังกฤษ API อาจจะไม่รู้เรื่อง
    const url = `https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/place?province=${encodeURIComponent(province)}&fields=${fields}&date=${currentDate}&hour=${currentHour}&duration=${duration}`;
  
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
        return new Response(JSON.stringify(data), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        return new Response(JSON.stringify({ error: data.message || 'Unknown error' }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error fetching TMD data:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch TMD data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }