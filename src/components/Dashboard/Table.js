import React, { useState, useEffect, useRef } from "react";

function Table({ onTableDataChange }) {
  const [stockData, setStockData] = useState([
    {
      ticker: "AMZN",
      name: "Amazon",
      price: "$5",
      quantity: 45,
      value: "$5,000",
      percentage: 5,
    },
    {
      ticker: "NVDA",
      name: "Nvidia",
      price: "$45",
      quantity: 450,
      value: "$45,000",
      percentage: 30,
    },
    {
      ticker: "IBM",
      name: "IBM",
      price: "$100",
      quantity: 100,
      value: "$10,000",
      percentage: 65,
    },
  ]);

  const prevStockData = useRef(); // Store the previous stockData to compare

  useEffect(() => {
    if (
      onTableDataChange &&
      JSON.stringify(prevStockData.current) !== JSON.stringify(stockData)
    ) {
      onTableDataChange(stockData); // Send stock data back to the parent Dashboard only when changed
    }
    prevStockData.current = stockData; // Update the reference with the current stockData
  }, [stockData, onTableDataChange]); // Only trigger this effect when stockData changes

  return (
    <div className="p-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Ticker</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Value</th>
            <th scope="col">% of Portfolio</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((row, index) => (
            <tr key={index}>
              <th scope="row">{row.ticker}</th>
              <td>{row.name}</td>
              <td>{row.price}</td>
              <td>{row.quantity}</td>
              <td>{row.value}</td>
              <td>{row.percentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
