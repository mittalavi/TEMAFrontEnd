import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarController, BarElement, LinearScale, CategoryScale);

const AvgResolutionTimeBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}api/resolutionTime`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const monthYears = data.map((item) => item.monthYear);
  const uniqueMonthYears = [...new Set(monthYears)].reverse();

  const avgTime = uniqueMonthYears.map((monthYear) => {
    const monthData = data.find((item) => item.monthYear === monthYear);
    return monthData ? monthData.avgResolutionTime : 0;
  });

  const totalResolutionTime = uniqueMonthYears.map((monthYear) => {
    const monthData = data.find((item) => item.monthYear === monthYear);
    return monthData ? monthData.resolutionTime : 0;
  });

  const chartData = {
    labels: uniqueMonthYears,
    datasets: [
      {
        label: "Total Resolution Time",
        data: totalResolutionTime,
        backgroundColor: "rgba(192, 75, 192, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
        legend: {
            display: true,
            labels: {
                fontColor: "#000080",
            }
        },
    },
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
        title: {
          display: true,
          text: "Resolution Time (mins)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    <div id="chart-container" style={{ maxWidth: '100%',height:'400px' }}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default AvgResolutionTimeBarChart;
