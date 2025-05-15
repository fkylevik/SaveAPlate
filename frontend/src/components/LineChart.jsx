// src/components/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const LineChart = ({ params }) => {
  const data = {
    datasets: [
      {
        label: params.label,
        data: params.datapoints,
        fill: false,
        borderColor: params.lineColor || '#2980b9',
        pointBackgroundColor: params.lineColor || '#2980b9',
        tension: 0.3,
        pointRadius: 4,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow CSS to size the chart
    plugins: {
      legend: {
        position: 'top',
        labels: {
          boxWidth: 20,
          padding: 12,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: params.timespan,
        },
        title: {
          display: true,
          text: `Time (${params.timespan})`,
        },
        ticks: {
          color: 'var(--text-dark)',
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: params.y_label,
        },
        ticks: {
          color: 'var(--text-dark)',
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <div className="carbon-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
