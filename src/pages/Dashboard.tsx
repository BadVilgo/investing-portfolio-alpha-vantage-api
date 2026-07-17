import { useCallback, useState } from "react";
import Table from "../components/Dashboard/Table";
import Chart from "../components/Dashboard/Chart";
import type { Stock } from "../types";
import { useAuth } from "../hooks/useAuth";
import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();
  const [tickers, setTickers] = useState<string[]>([]);
  const [percentages, setPercentages] = useState<number[]>([]);

  const handleTableData = useCallback((data: Stock[]) => {
    setTickers(data.map((row) => row.ticker));
    setPercentages(data.map((row) => row.percentage));
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h1 className="text-center mb-5">Your Investment Dashboard</h1>
        <div className="row align-items-start">
          <div className="table-all col-12 col-md-8">
            <Table userId={user.id} onTableDataChange={handleTableData} />
          </div>
          <div className="chart-all col-12 col-md-4">
            <Chart tickers={tickers} percentages={percentages} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
