import React, { useState, useEffect } from "react";
import Table from "../components/Dashboard/Table";
import Chart from "../components/Dashboard/Chart";
import SearchBar from "../components/Dashboard/SearchBar";

function Dashboard() {
  const [tickers, setTickers] = useState([]);
  const [percentages, setPercentages] = useState([]);

  // Example of how you would get data from Table component
  const handleTableData = (data) => {
    const tickersData = data.map((row) => row.ticker);
    const percentagesData = data.map((row) => row.percentage);
    setTickers(tickersData);
    setPercentages(percentagesData);
  };

  return (
    <div className="text-center">
      <h1 className="m-3">Dashboard</h1>
      <div className="d-flex align-items-center justify-content-center vw-100">
        <div className="w-75 align-self-right d-flex">
          <Table onTableDataChange={handleTableData} />
        </div>
        <div className="w-25 align-self-left d-flex">
          <Chart tickers={tickers} percentages={percentages} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
