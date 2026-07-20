import { useCallback, useMemo, useState } from "react";
import Table from "../components/Dashboard/Table";
import Chart from "../components/Dashboard/Chart";
import MetricCards from "../components/Dashboard/MetricCards";
import HistoryChart from "../components/Dashboard/HistoryChart";
import ConcentrationCard from "../components/Dashboard/ConcentrationCard";
import type { PortfolioSnapshot } from "../types";
import { buildHistory, concentration } from "../lib/portfolio";
import { useAuth } from "../hooks/useAuth";
import { usePageMeta } from "../hooks/usePageMeta";
import "./Dashboard.css";

function Dashboard() {
  usePageMeta("Your Dashboard - Stock Dashboard");
  const { user } = useAuth();
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot | null>(null);

  const handleDataChange = useCallback((next: PortfolioSnapshot) => {
    setSnapshot(next);
  }, []);

  const metrics = useMemo(() => {
    const stocks = snapshot?.stocks ?? [];
    const quotes = snapshot?.quotes ?? {};

    const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
    const costBasis = stocks.reduce((sum, stock) => sum + stock.avgCost * stock.quantity, 0);
    const totalGain = totalValue - costBasis;
    const dayChange = stocks.reduce(
      (sum, stock) => sum + stock.quantity * (quotes[stock.ticker]?.change ?? 0),
      0
    );
    const previousValue = totalValue - dayChange;
    const largest = stocks.reduce(
      (max, stock) => (stock.value > (max?.value ?? 0) ? stock : max),
      null as (typeof stocks)[number] | null
    );

    return {
      totalValue,
      totalGain,
      totalGainPercent: costBasis > 0 ? (totalGain / costBasis) * 100 : 0,
      dayChange,
      dayChangePercent: previousValue > 0 ? (dayChange / previousValue) * 100 : 0,
      largestTicker: largest?.ticker ?? "",
      largestShare: largest?.percentage ?? 0,
    };
  }, [snapshot]);

  const history = useMemo(
    () => (snapshot ? buildHistory(snapshot.stocks, snapshot.series) : []),
    [snapshot]
  );

  const concentrationData = useMemo(
    () => (snapshot ? concentration(snapshot.stocks) : null),
    [snapshot]
  );

  if (!user) {
    return null;
  }

  const isDemo = user.email === "test@test.com";

  return (
    <div className="dashboard-background">
      <div className="container py-4 py-md-5">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
          <h1 className="h3 mb-0">Your Investment Dashboard</h1>
          {isDemo && (
            <span className="badge demo-badge" role="status">
              Demo account - sample data
            </span>
          )}
        </div>

        <MetricCards loading={!snapshot} {...metrics} />

        <HistoryChart history={history} />

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <Table userId={user.id} onDataChange={handleDataChange} />
          </div>
          <div className="col-12 col-lg-4">
            <Chart
              tickers={snapshot?.stocks.map((stock) => stock.ticker) ?? []}
              percentages={snapshot?.stocks.map((stock) => stock.percentage) ?? []}
              totalValue={metrics.totalValue}
            />
            <ConcentrationCard data={concentrationData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
