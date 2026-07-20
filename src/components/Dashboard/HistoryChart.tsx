import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  type TooltipItem,
} from "chart.js";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatSignedPercent } from "../../lib/format";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

interface HistoryChartProps {
  history: number[];
}

function HistoryChart({ history }: HistoryChartProps) {
  const theme = useTheme();
  const dark = theme === "dark";

  if (history.length < 2) {
    return null;
  }

  const changePercent = ((history[history.length - 1] - history[0]) / history[0]) * 100;
  const rising = changePercent >= 0;
  const lineColor = rising ? (dark ? "#39c48d" : "#178a5b") : dark ? "#ff7a85" : "#d64550";
  const gridColor = dark ? "rgba(147, 160, 184, 0.12)" : "rgba(100, 116, 139, 0.12)";
  const tickColor = dark ? "#93a0b8" : "#64748b";

  const labels = history.map((_, index) => {
    const daysAgo = history.length - 1 - index;
    return daysAgo === 0 ? "Today" : `${daysAgo}d ago`;
  });

  const data = {
    labels,
    datasets: [
      {
        data: history,
        borderColor: lineColor,
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 12,
        tension: 0.25,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"line">) => formatCurrency(context.parsed.y ?? 0),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: tickColor, maxTicksLimit: 5, maxRotation: 0 },
      },
      y: {
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          maxTicksLimit: 5,
          callback: (value: string | number) => formatCurrency(Number(value)),
        },
      },
    },
  };

  return (
    <div className="app-card mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-2">
        <span className="small text-app-muted">Value of current holdings, last 30 days</span>
        <span className={`small fw-semibold tabular-nums ${rising ? "text-gain" : "text-loss"}`}>
          {formatSignedPercent(changePercent, 1)}
        </span>
      </div>
      <div
        className="history-chart"
        role="img"
        aria-label={`Line chart of portfolio value over the last ${history.length} days, ${
          rising ? "up" : "down"
        } ${Math.abs(changePercent).toFixed(1)} percent overall`}
      >
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default HistoryChart;
