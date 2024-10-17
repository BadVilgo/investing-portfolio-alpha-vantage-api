import React, { useState } from "react";
import Table from "../components/Dashboard/Table";
import Chart from "../components/Dashboard/Chart";
import "./Dashboard.css";

function Dashboard() {
  const [tickers, setTickers] = useState([]);
  const [percentages, setPercentages] = useState([]);

  const handleTableData = (data) => {
    const tickersData = data.map((row) => row.ticker);
    const percentagesData = data.map((row) => row.percentage);
    setTickers(tickersData);
    setPercentages(percentagesData);
  };

  return (
    <div className="dashboard-background">
      <div className="container py-5">
        <h1 className="text-center mb-5">Your Investment Dashboard</h1>
        <div className="row align-items-start">
          <div className="table-all col-12 col-md-8">
            <Table onTableDataChange={handleTableData} />
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
