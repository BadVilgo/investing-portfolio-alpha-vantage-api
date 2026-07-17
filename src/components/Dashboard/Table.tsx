import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import type { Stock } from "../../types";
import { fetchPrices } from "../../lib/twelveData";
import {
  initialStockData,
  loadPortfolio,
  readLocalPortfolio,
  recalculatePercentages,
  savePortfolio,
  writeLocalPortfolio,
} from "../../lib/portfolio";

interface TableProps {
  userId: string;
  onTableDataChange: (data: Stock[]) => void;
}

function Table({ userId, onTableDataChange }: TableProps) {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function init() {
      let base: Stock[] | null = null;

      try {
        base = await loadPortfolio(userId);
      } catch {
        if (active) {
          setNotice("Could not reach the database. Showing locally saved data.");
        }
        base = readLocalPortfolio();
      }

      if (base === null) {
        base = readLocalPortfolio() ?? initialStockData;
      }

      try {
        const prices = await fetchPrices(base.map((stock) => stock.ticker));
        base = base.map((stock) => {
          const price = prices[stock.ticker] ?? stock.price;
          return { ...stock, price, value: price * stock.quantity };
        });
      } catch {
        if (active) {
          setNotice("Live prices are unavailable right now. Showing the last known values.");
        }
      }

      if (active) {
        setStockData(recalculatePercentages(base));
        setLoading(false);
      }
    }

    init();

    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    if (loading) {
      return;
    }

    writeLocalPortfolio(stockData);
    savePortfolio(userId, stockData).catch(() => {
      setNotice("Changes are saved locally but could not sync to your account.");
    });
    onTableDataChange(stockData);
  }, [stockData, loading, userId, onTableDataChange]);

  function handleQuantityChange(ticker: string, newQuantity: string) {
    setStockData((prev) => {
      const quantity = Number(newQuantity) || 0;
      const updated = prev.map((stock) =>
        stock.ticker === ticker
          ? { ...stock, quantity, value: stock.price * quantity }
          : stock
      );
      return recalculatePercentages(updated);
    });
  }

  function handleRemoveStock(ticker: string) {
    setStockData((prev) =>
      recalculatePercentages(prev.filter((stock) => stock.ticker !== ticker))
    );
  }

  function handleAddStock(stock: Stock) {
    setStockData((prev) => {
      if (prev.some((item) => item.ticker === stock.ticker)) {
        setNotice(`${stock.ticker} is already in your portfolio.`);
        return prev;
      }
      return recalculatePercentages([...prev, stock]);
    });
  }

  if (loading) {
    return (
      <div className="text-center text-white py-5" role="status" aria-live="polite">
        <div className="spinner-border" aria-hidden="true"></div>
        <p className="mt-3">Loading your portfolio...</p>
      </div>
    );
  }

  return (
    <div className="table-searchbar p-2">
      <SearchBar onAddStock={handleAddStock} />

      {notice && (
        <p className="alert alert-warning py-2" role="status">
          {notice}
        </p>
      )}

      <div className="table-container">
        <div className="table-responsive" style={{ maxHeight: "400px" }}>
          <table className="table table-striped table-hover">
            <caption className="visually-hidden">Your stock portfolio holdings</caption>
            <thead>
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
            <tbody>
              {stockData.map((row) => (
                <tr key={row.ticker}>
                  <th scope="row">{row.ticker}</th>
                  <td>{row.name}</td>
                  <td>${row.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      className="form-control"
                      placeholder="Add quantity"
                      value={row.quantity}
                      onChange={(e) => handleQuantityChange(row.ticker, e.target.value)}
                      aria-label={`Quantity of ${row.ticker}`}
                    />
                  </td>
                  <td>${row.value.toFixed(2)}</td>
                  <td>{row.percentage}%</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveStock(row.ticker)}
                      aria-label={`Remove ${row.ticker} from your portfolio`}
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
