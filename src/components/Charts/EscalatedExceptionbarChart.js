import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarController, BarElement, LinearScale, CategoryScale);

const EscalatedExceptionBarChat = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8092/api/escalationNumber")
      .then((response) => {
        setData(response.data);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const monthYears = data.map((item) => item.monthYear);

  const uniqueMonthYears = [...new Set(monthYears)].reverse();

  const totalData = uniqueMonthYears.map((monthYear) => {
    const monthData = data.find((item) => item.monthYear === monthYear);

    return monthData ? monthData.total : 0;
  });

  const totalCompletedData = uniqueMonthYears.map((monthYear) => {
    const monthData = data.find((item) => item.monthYear === monthYear);

    return monthData ? monthData.totalCompleted : 0;
  });

  const escalationCountData = uniqueMonthYears.map((monthYear) => {
    const monthData = data.find((item) => item.monthYear === monthYear);

    return monthData ? monthData.escalationCount : 0;
  });

  const chartData = {
    labels: uniqueMonthYears,

    datasets: [
      {
        label: "Total",

        data: totalData,

        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },

      {
        label: "Total Completed",

        data: totalCompletedData,

        backgroundColor: "rgba(192, 75, 192, 0.8)",
      },

      {
        label: "Escalation Count",

        data: escalationCountData,

        backgroundColor: "rgba(192, 192, 75, 0.8)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    scales: {
      y: {
        type: "linear",

        beginAtZero: true,

        title: {
          display: true,

          text: "Number Of Exceptions",
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
    <div id="chart-container" style={{ maxWidth:'100%',height: "400px"}}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default EscalatedExceptionBarChat;
