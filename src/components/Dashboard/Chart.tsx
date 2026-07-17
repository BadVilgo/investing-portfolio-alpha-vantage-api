import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  tickers: string[];
  percentages: number[];
}

function buildColors(count: number, alpha: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const hue = Math.round((360 / Math.max(count, 1)) * index);
    return `hsla(${hue}, 70%, 60%, ${alpha})`;
  });
}

function Chart({ tickers, percentages }: ChartProps) {
  const data = {
    labels: tickers,
    datasets: [
      {
        label: "% of Portfolio",
        data: percentages,
        backgroundColor: buildColors(tickers.length, 0.4),
        borderColor: buildColors(tickers.length, 1),
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
