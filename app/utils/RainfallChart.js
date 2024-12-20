import React from 'react';
import {
  Bar
} from 'react-chartjs-2';
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

export const RelativeHumidityChart = ({
  forecasts,
  timeRange
}) => {
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
          family: 'Prompt',
          size: 34, // Increase font size for better readability
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
            family: 'Prompt',
            size: 14 // Increase font size for y-axis title
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'วันที่',
          font: {
            family: 'Prompt',
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
        month: 'short',
        family: 'Prompt',
      });
    }),
    datasets: [{
      label: `ความชื้นสัมพัทธ์ (${timeRange === 'hourly' ? 'รายชั่วโมง' : 'รายวัน'})`,
      data: forecasts.slice(1, 7).map((item) => item.data ?.rh || 0),
      backgroundColor: 'rgba(7, 4, 73, 0.98)', // Soft red color
      borderColor: 'rgb(7, 7, 56)',
      borderWidth: 1,
      family: 'Prompt',
    }, ],
  };

  return <Bar data = {
    chartData
  }
  options = {
    chartOptions
  }
  />;
};

export default RelativeHumidityChart;