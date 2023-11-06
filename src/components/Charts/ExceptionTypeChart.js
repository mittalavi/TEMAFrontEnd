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

const ExceptionTypeChart = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_BASE_URL}api/getAllExceptions`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const exceptionTypes = data?.map((exception) => exception.exceptionType);
  const uniqueExceptionTypes = [...new Set(exceptionTypes)];
  const exceptionTypeCounts = uniqueExceptionTypes?.map(
    (type) =>
      exceptionTypes?.filter((exceptionType) => exceptionType === type).length
  );

  const chartData = {
    labels: uniqueExceptionTypes,
    datasets: [
      {
        label: "Exception Type Frequency",
        data: exceptionTypeCounts,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        barPercentage: 0.2,
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
          text: "Frequency",
        },
      },

      x: {
        title: {
          display: true,
          text: "Exception Types",
        },
      },
    },
  };

  return (
     <div id="chart-container" style={{maxWidth:'100%', height:'400px'}}>
    <Bar data={chartData} options={chartOptions} />
  </div>
  );
};

export default ExceptionTypeChart;
