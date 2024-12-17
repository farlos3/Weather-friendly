// utils/createRainfallChart.js
import { Bar } from "react-chartjs-2";

export const createRainfallChart = (forecasts, timeRange) => {
  const chartData = {
    labels: forecasts.map((item) => item.time.split("T")[0]),
    datasets: [
      {
        label: `ปริมาณฝน (${timeRange === "hourly" ? "รายชั่วโมง" : "รายวัน"})`,
        data: forecasts.map((item) => item.data?.rain || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={{ responsive: true }} />;
};