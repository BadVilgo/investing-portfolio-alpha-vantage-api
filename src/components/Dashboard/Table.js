import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";

function Table({ onTableDataChange }) {
  const initialStockData = [
    {
      ticker: "AMZN",
      name: "Amazon",
      price: 182,
      quantity: 5,
      value: 225,
      percentage: 0,
    },
    {
      ticker: "NVDA",
      name: "Nvidia",
      price: 132,
      quantity: 10,
      value: 200,
      percentage: 0,
    },
    {
      ticker: "IBM",
      name: "IBM",
      price: 228,
      quantity: 15,
      value: 100,
      percentage: 0,
    },
  ];

  const [stockData, setStockData] = useState(() => {
    const savedData = localStorage.getItem("stockData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.map((stock) => ({
        ...stock,
        price: Number(stock.price),
        quantity: Number(stock.quantity),
        value: Number(stock.value),
        percentage: Number(stock.percentage),
      }));
    }
    return initialStockData;
  });

  const prevStockData = useRef();

  useEffect(() => {
    localStorage.setItem("stockData", JSON.stringify(stockData));
    if (
      onTableDataChange &&
      JSON.stringify(prevStockData.current) !== JSON.stringify(stockData)
    ) {
      onTableDataChange(stockData);
    }
    prevStockData.current = stockData;
  }, [stockData, onTableDataChange]);

  useEffect(() => {
    async function fetchPrices() {
      const symbols = stockData.map((stock) => stock.ticker).join(",");
      const apiKey = "94050ca4986345e4a0cdf9eeaa310f51";

      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=${symbols}&apikey=${apiKey}`
        );
        const data = await response.json();

        setStockData((prevStockData) => {
          const newStockData = prevStockData.map((stock) => {
            const updatedPrice = parseFloat(data[stock.ticker]?.price);
            const value = updatedPrice * stock.quantity;
            return {
              ...stock,
              price: updatedPrice || stock.price,
              value: value || stock.value,
            };
          });

          const totalValue = newStockData.reduce(
            (sum, stock) => sum + stock.value,
            0
          );

          newStockData.forEach((stock) => {
            stock.percentage = totalValue
              ? ((stock.value / totalValue) * 100).toFixed(2)
              : 0;
          });

          return newStockData;
        });
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }

    fetchPrices();
  }, []);

  function handleQuantityChange(index, newQuantity) {
    setStockData((prevStockData) => {
      const newStockData = [...prevStockData];
      const quantity = Number(newQuantity) || 0;
      const value = newStockData[index].price * quantity;
      const updatedStock = {
        ...newStockData[index],
        quantity: quantity,
        value: value,
      };
      newStockData[index] = updatedStock;

      const totalValue = newStockData.reduce(
        (sum, stock) => sum + stock.value,
        0
      );

      newStockData.forEach((stock) => {
        stock.percentage = totalValue
          ? ((stock.value / totalValue) * 100).toFixed(2)
          : 0;
      });

      return newStockData;
    });
  }

  function handleRemoveStock(index) {
    setStockData((prevStockData) => {
      const newStockData = [...prevStockData];
      newStockData.splice(index, 1);

      const totalValue = newStockData.reduce(
        (sum, stock) => sum + stock.value,
        0
      );

      newStockData.forEach((stock) => {
        stock.percentage = totalValue
          ? ((stock.value / totalValue) * 100).toFixed(2)
          : 0;
      });

      return newStockData;
    });
  }

  function handleAddStock(stock) {
    setStockData((prevStockData) => {
      const existingStock = prevStockData.find(
        (item) => item.ticker === stock.ticker
      );
      if (existingStock) {
        alert("Stock already exists in your portfolio.");
        return prevStockData;
      }

      const newStockData = [...prevStockData, stock];

      const totalValue = newStockData.reduce(
        (sum, stock) => sum + stock.value,
        0
      );

      newStockData.forEach((stock) => {
        stock.percentage = totalValue
          ? ((stock.value / totalValue) * 100).toFixed(2)
          : 0;
      });

      return newStockData;
    });
  }

  return (
    <div className="table-searchbar p-2">
      <SearchBar onAddStock={handleAddStock} />
      <div className="table-container">
        <div className="table-responsive" style={{ maxHeight: "400px" }}>
          <table className="table table-striped table-hover  ">
            <thead className="">
              <tr>
                <th scope="col">Ticker</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Value</th>
                <th scope="col">% of Portfolio</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {stockData.map((row, index) => (
                <tr key={index}>
                  <th scope="row">{row.ticker}</th>
                  <td>{row.name}</td>
                  <td>${Number(row.price).toFixed(2)}</td>
                  <td className="">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Add quantity"
                      value={row.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    ></input>
                  </td>
                  <td>${Number(row.value).toFixed(2)}</td>
                  <td>{row.percentage}%</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveStock(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
