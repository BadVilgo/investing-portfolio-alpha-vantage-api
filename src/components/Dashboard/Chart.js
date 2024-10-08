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
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Disable animations in the chart options
  const options = {
    animation: {
      duration: 1000, // Disable general animation
    },
    hover: {
      animationDuration: 1000, // Disable hover animation
    },
    plugins: {
      tooltip: {
        enabled: true, // Tooltips enabled
        animation: true, // Disable tooltip animations
      },
    },
  };

  return (
    <div>
      <h3>Portfolio Distribution</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

export default Chart;
