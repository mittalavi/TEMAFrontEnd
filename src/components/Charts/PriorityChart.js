import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const PriorityChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8092/api/getAllExceptions')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const priorityCounts = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
  };

  data.forEach((exception) => {
    const priority = exception.priority;
      priorityCounts[priority]++;
    
  });

  const priorityLabels = Object.keys(priorityCounts);
  const priorityData = Object.values(priorityCounts);

  const chartData = {
    labels: priorityLabels,
    datasets: [
      {
        label: 'Priority Distribution',
        data: priorityData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(192, 75, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(192, 75, 192, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Priority Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Priority Level',
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '100%',height:'400px'}}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PriorityChart;
