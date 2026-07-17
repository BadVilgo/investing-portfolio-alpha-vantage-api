import type { Concentration } from "../../lib/portfolio";

interface ConcentrationCardProps {
  data: Concentration | null;
}

const LEVEL_LABELS: Record<Concentration["level"], string> = {
  balanced: "Balanced",
  moderate: "Moderate",
  high: "High",
};

const LEVEL_CLASSES: Record<Concentration["level"], string> = {
  balanced: "text-gain",
  moderate: "text-warning",
  high: "text-loss",
};

const BAR_COLORS: Record<Concentration["level"], string> = {
  balanced: "var(--gain)",
  moderate: "#ef9f27",
  high: "var(--loss)",
};

function ConcentrationCard({ data }: ConcentrationCardProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="app-card mt-3">
      <div className="d-flex justify-content-between align-items-baseline mb-2">
        <span className="small text-app-muted">Concentration</span>
        <span className={`small fw-semibold ${LEVEL_CLASSES[data.level]}`}>
          {LEVEL_LABELS[data.level]}
        </span>
      </div>
      <div
        className="concentration-track"
        role="img"
        aria-label={`${data.topShare}% of portfolio value is in ${data.topTicker}`}
      >
        <div
          className="concentration-fill"
          style={{ width: `${data.topShare}%`, backgroundColor: BAR_COLORS[data.level] }}
        ></div>
      </div>
      <p className="small text-app-muted mt-2 mb-0">
        {data.topShare}% of value sits in {data.topTicker}. Shown for information only.
      </p>
    </div>
  );
}

export default ConcentrationCard;
