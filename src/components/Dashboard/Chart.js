import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ tickers, percentages }) {
  const data = {
    labels: tickers,
    datasets: [
      {
        label: "% of Portfolio",
        data: percentages,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Red
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(255, 206, 86, 0.2)", // Yellow
          "rgba(75, 192, 192, 0.2)", // Teal
          "rgba(153, 102, 255, 0.2)", // Purple
          "rgba(255, 159, 64, 0.2)", // Orange
          "rgba(201, 203, 207, 0.2)", // Grey
          "rgba(255, 105, 180, 0.2)", // Hot Pink
          "rgba(50, 205, 50, 0.2)", // Lime Green
          "rgba(255, 140, 0, 0.2)", // Dark Orange
          "rgba(0, 191, 255, 0.2)", // Deep Sky Blue
          "rgba(138, 43, 226, 0.2)", // Blue Violet
          "rgba(220, 20, 60, 0.2)", // Crimson
          "rgba(0, 255, 127, 0.2)", // Spring Green
          "rgba(255, 20, 147, 0.2)", // Deep Pink
          "rgba(0, 255, 255, 0.2)", // Cyan
          "rgba(255, 215, 0, 0.2)", // Gold
          "rgba(0, 128, 128, 0.2)", // Teal
          "rgba(186, 85, 211, 0.2)", // Medium Orchid
          "rgba(144, 238, 144, 0.2)", // Light Green
          "rgba(210, 105, 30, 0.2)", // Chocolate
          "rgba(106, 90, 205, 0.2)", // Slate Blue
          "rgba(255, 182, 193, 0.2)", // Light Pink
          "rgba(127, 255, 0, 0.2)", // Chartreuse
          "rgba(72, 61, 139, 0.2)", // Dark Slate Blue
          "rgba(255, 69, 0, 0.2)", // Red-Orange
          "rgba(173, 216, 230, 0.2)", // Light Blue
          "rgba(0, 128, 0, 0.2)", // Green
          "rgba(245, 222, 179, 0.2)", // Wheat
          "rgba(255, 228, 181, 0.2)", // Moccasin
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Red
          "rgba(54, 162, 235, 1)", // Blue
          "rgba(255, 206, 86, 1)", // Yellow
          "rgba(75, 192, 192, 1)", // Teal
          "rgba(153, 102, 255, 1)", // Purple
          "rgba(255, 159, 64, 1)", // Orange
          "rgba(201, 203, 207, 1)", // Grey
          "rgba(255, 105, 180, 1)", // Hot Pink
          "rgba(50, 205, 50, 1)", // Lime Green
          "rgba(255, 140, 0, 1)", // Dark Orange
          "rgba(0, 191, 255, 1)", // Deep Sky Blue
          "rgba(138, 43, 226, 1)", // Blue Violet
          "rgba(220, 20, 60, 1)", // Crimson
          "rgba(0, 255, 127, 1)", // Spring Green
          "rgba(255, 20, 147, 1)", // Deep Pink
          "rgba(0, 255, 255, 1)", // Cyan
          "rgba(255, 215, 0, 1)", // Gold
          "rgba(0, 128, 128, 1)", // Teal
          "rgba(186, 85, 211, 1)", // Medium Orchid
          "rgba(144, 238, 144, 1)", // Light Green
          "rgba(210, 105, 30, 1)", // Chocolate
          "rgba(106, 90, 205, 1)", // Slate Blue
          "rgba(255, 182, 193, 1)", // Light Pink
          "rgba(127, 255, 0, 1)", // Chartreuse
          "rgba(72, 61, 139, 1)", // Dark Slate Blue
          "rgba(255, 69, 0, 1)", // Red-Orange
          "rgba(173, 216, 230, 1)", // Light Blue
          "rgba(0, 128, 0, 1)", // Green
          "rgba(245, 222, 179, 1)", // Wheat
          "rgba(255, 228, 181, 1)", // Moccasin
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    plugins: {
      tooltip: {
        enabled: true,
        animation: true,
      },
    },
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="text-center my-4 my-md-0">
        <h3>Portfolio Distribution</h3>
      </div>
      <div className="chart-pie d-flex justify-content-center align-items-center bg-white p-4 p-md-5 mt-3 shadow rounded-3">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default Chart;
