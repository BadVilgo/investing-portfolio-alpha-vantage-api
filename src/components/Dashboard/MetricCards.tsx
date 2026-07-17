import { useCountUp } from "../../hooks/useCountUp";
import {
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
} from "../../lib/format";

interface MetricCardsProps {
  loading: boolean;
  totalValue: number;
  totalGain: number;
  totalGainPercent: number;
  dayChange: number;
  dayChangePercent: number;
  largestTicker: string;
  largestShare: number;
}

interface MetricCardProps {
  label: string;
  value: string;
  tone?: "gain" | "loss";
  detail?: string;
  loading: boolean;
}

function MetricCard({ label, value, tone, detail, loading }: MetricCardProps) {
  const toneClass = tone === "gain" ? "text-gain" : tone === "loss" ? "text-loss" : "";

  return (
    <div className={`app-card metric-card ${loading ? "skeleton" : ""}`}>
      <div className="small text-app-muted">{label}</div>
      <div className={`metric-value tabular-nums ${toneClass}`}>
        {value}
        {detail && <span className="metric-detail"> {detail}</span>}
      </div>
    </div>
  );
}

function MetricCards({
  loading,
  totalValue,
  totalGain,
  totalGainPercent,
  dayChange,
  dayChangePercent,
  largestTicker,
  largestShare,
}: MetricCardsProps) {
  const animatedTotal = useCountUp(totalValue);
  const animatedGain = useCountUp(totalGain);
  const animatedDay = useCountUp(dayChange);

  return (
    <div className="metric-grid mb-4">
      <MetricCard
        loading={loading}
        label="Total value"
        value={formatCurrency(animatedTotal)}
      />
      <MetricCard
        loading={loading}
        label="Total gain / loss"
        value={formatSignedCurrency(animatedGain)}
        detail={`(${formatSignedPercent(totalGainPercent)})`}
        tone={totalGain >= 0 ? "gain" : "loss"}
      />
      <MetricCard
        loading={loading}
        label="Today"
        value={formatSignedCurrency(animatedDay)}
        detail={`(${formatSignedPercent(dayChangePercent)})`}
        tone={dayChange >= 0 ? "gain" : "loss"}
      />
      <MetricCard
        loading={loading}
        label="Largest position"
        value={largestTicker || "-"}
        detail={largestTicker ? `${largestShare.toFixed(0)}%` : ""}
      />
    </div>
  );
}

export default MetricCards;
