import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type Plugin,
  type TooltipItem,
} from "chart.js";
import { useTheme } from "../../hooks/useTheme";
import { formatCurrency, formatPercent } from "../../lib/format";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  tickers: string[];
  percentages: number[];
  totalValue: number;
}

function buildColors(count: number, alpha: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    const hue = Math.round((360 / Math.max(count, 1)) * index + 210) % 360;
    return `hsla(${hue}, 65%, 55%, ${alpha})`;
  });
}

function Chart({ tickers, percentages, totalValue }: ChartProps) {
  const theme = useTheme();
  const dark = theme === "dark";
  const textColor = dark ? "#e8ecf6" : "#1c2536";
  const mutedColor = dark ? "#93a0b8" : "#64748b";

  const data = {
    labels: tickers,
    datasets: [
      {
        label: "% of Portfolio",
        data: percentages,
        backgroundColor: buildColors(tickers.length, 0.75),
        borderColor: dark ? "#151c2e" : "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const centerText: Plugin<"doughnut"> = {
    id: "centerText",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "12px Inter, sans-serif";
      ctx.fillStyle = mutedColor;
      ctx.fillText("Total", x, y - 12);
      ctx.font = "600 16px Inter, sans-serif";
      ctx.fillStyle = textColor;
      ctx.fillText(formatCurrency(totalValue), x, y + 8);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: textColor, boxWidth: 12, padding: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"doughnut">) =>
            `${context.label}: ${formatPercent(context.parsed)}`,
        },
      },
    },
  };

  return (
    <div className="app-card">
      <h2 className="h6 mb-3">Allocation</h2>
      <div className="chart-pie">
        <Doughnut
          key={`${theme}-${totalValue.toFixed(2)}`}
          data={data}
          options={options}
          plugins={[centerText]}
        />
      </div>
    </div>
  );
}

export default Chart;
