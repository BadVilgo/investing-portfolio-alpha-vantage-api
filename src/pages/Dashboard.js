import React, { useState, useEffect } from "react";
import Table from "../components/Dashboard/Table";
import Chart from "../components/Dashboard/Chart";
import SearchBar from "../components/Dashboard/SearchBar";
import SaveBtn from "../components/Dashboard/SaveBtn";

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
      <h1 className="">Dashboard</h1>
      <div className="d-flex align-items-center justify-content-center vw-100">
        <div className="w-100">
          {/* Pass a callback to get data from the Table */}
          <Table onTableDataChange={handleTableData} />
        </div>

        {/* Pass the tickers and percentages to the Chart component */}
        <Chart tickers={tickers} percentages={percentages} />
      </div>
    </div>
  );
}

export default Dashboard;
