 // weather.js
import { useState, useEffect } from "react";

const useWeatherData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('https://data.tmd.go.th/nwpapiv1/forecast/daily/datarange', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjU0NWFlYzI3ZGI1Y2U5YzE2ZGE0ZmQxYjVjYjVjOTg0OWIwY2IwZGIwZjkwODhmN2Q5MGI4NzA0Yzg3NDVlOTg0ZTMyNWM3OTk5NmI2OGMyIn0.eyJhdWQiOiIyIiwianRpIjoiNTQ1YWVjMjdkYjVjZTljMTZkYTRmZDFiNWNiNWM5ODQ5YjBjYjBkYjBmOTA4OGY3ZDkwYjg3MDRjODc0NWU5ODRlMzI1Yzc5OTk2YjY4YzIiLCJpYXQiOjE3MzIyNjM1NjYsIm5iZiI6MTczMjI2MzU2NiwiZXhwIjoxNzYzNzk5NTY2LCJzdWIiOiIzNTYxIiwic2NvcGVzIjpbXX0.A1I-Tr1pmfAvdfNBVU0LRciUuQ2bcKljnH5Z-v_bYhLUE9GjJn9sRifItSW8AtA_bqXUnepdb9LbNv4-6B7Ut4GhrfMhhoyoZf8mCvzgYfFPogpZ0-QGGw3G2v-CSDKqCvsiWdsY3BC2cFkvfZHi0YlaXcnMnfVNrNGfiVfFqDQjScwlM0QQTWG8vQNelNFN8N1Xm9KBtWp45xu0pGGEICQHQcKxHAVh_iycWAHjkDmCnnMWOmjEXiw3Q3Re6vd--Dh5qpkj-BspkUVwVk-16Hh4T1itw6qWI23byW5_0mYdSqAXngPmp3tWYVcfaGYNoelvPFKpvFgeezXi7yvfNVw-lXgTysa_y0f78x3NyYC5vrA-j943FcT4Vxo5gJ0NXD0s4fc1ZAVx6TC8B4v0rFcNM3QL8am9QxRJHwl4dUKq07vLmIaxJXP9sgW7iRBriKUsNGwjCuxIeu11WdJ-nBcmxncOmEiAe9hEk5QRR7LHUC58dg09Dci9LLho3kuJVDVb45FxUt1V6nIy7JfKGc9iyL-89SQQZZR-EnIQcMIqHVAtZ6UTmNUMM5Hs4m1YNGbCadcwUWF_wHhYX3Ygx9HxmmAcwv4xXWHVTOEXOLgiBdGEbCXLEIU3mVGYIOCdjogE6slYsqn2ObheNjf-hhBFFIDu8VTDIdbsI4cFd3I', // ใช้ token ที่ถูกต้อง
          },
        });

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return { data, loading, error };
};

export default useWeatherData;  // ต้อง export ฟังก์ชันด้วย export default
