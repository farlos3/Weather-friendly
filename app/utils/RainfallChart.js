import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const RelativeHumidityChart = ({ forecasts, timeRange }) => {
  // Prepare chart configuration
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `ความชื้นสัมพัทธ์ (${timeRange === 'hourly' ? 'รายชั่วโมง' : 'รายวัน'})`,
        font: {
          size: 18, // Increase font size for better readability
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 220,
        ticks: {
          stepSize: 20, // Show tick marks every 20 percentage points
          callback: (value) => `${value}%` // Display tick labels with % symbol
        },
        title: {
          display: true,
          text: 'เปอร์เซ็นต์',
          font: {
            size: 14 // Increase font size for y-axis title
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'วันที่',
          font: {
            size: 14 // Increase font size for x-axis title
          }
        }
      }
    }
  };

  const chartData = {
    labels: forecasts.slice(1, 7).map((item) => {
      // Format date for better readability
      const date = new Date(item.time);
      return date.toLocaleDateString('th-TH', { 
        day: 'numeric', 
        month: 'short' 
      });
    }),
    datasets: [
      {
        label: `ความชื้นสัมพัทธ์ (${timeRange === 'hourly' ? 'รายชั่วโมง' : 'รายวัน'})`,
        data: forecasts.slice(1, 7).map((item) => item.data?.rh || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Soft red color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default RelativeHumidityChart;