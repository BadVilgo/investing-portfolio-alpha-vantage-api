import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Sparkline from "./Sparkline";
import Toast from "../Toast";
import type { PortfolioSnapshot, Quote, Stock } from "../../types";
import { fetchQuotes, fetchSeriesCached } from "../../lib/twelveData";
import {
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
} from "../../lib/format";
import {
  initialStockData,
  loadPortfolio,
  readLocalPortfolio,
  recalculatePercentages,
  savePortfolio,
  toCsv,
  writeLocalPortfolio,
} from "../../lib/portfolio";

interface TableProps {
  userId: string;
  onDataChange: (snapshot: PortfolioSnapshot) => void;
}

interface ToastState {
  message: string;
  removed?: Stock;
}

const lastAutoRefresh = { at: 0 };
const AUTO_REFRESH_COOLDOWN = 15000;

function Table({ userId, onDataChange }: TableProps) {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const [series, setSeries] = useState<Record<string, number[]>>({});
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notice, setNotice] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const activeRef = useRef(true);

  const loadSeries = useCallback((tickers: string[]) => {
    fetchSeriesCached(tickers, (symbol, values) => {
      if (activeRef.current) {
        setSeries((prev) => ({ ...prev, [symbol]: values }));
      }
    });
  }, []);

  const refreshMarket = useCallback(
    async (stocks: Stock[]) => {
      const tickers = stocks.map((stock) => stock.ticker);
      if (tickers.length === 0) {
        return;
      }
      setRefreshing(true);
      try {
        const freshQuotes = await fetchQuotes(tickers);
        if (!activeRef.current) {
          return;
        }
        setQuotes((prev) => ({ ...prev, ...freshQuotes }));
        setStockData((prev) =>
          recalculatePercentages(
            prev.map((stock) => {
              const quote = freshQuotes[stock.ticker];
              if (!quote) {
                return stock;
              }
              return { ...stock, price: quote.close, value: quote.close * stock.quantity };
            })
          )
        );
        setUpdatedAt(new Date());
        setNotice("");
      } catch {
        if (activeRef.current) {
          setNotice("Live prices are unavailable right now. Showing the last known values.");
        }
      } finally {
        if (activeRef.current) {
          setRefreshing(false);
        }
      }
      loadSeries(tickers);
    },
    [loadSeries]
  );

  useEffect(() => {
    activeRef.current = true;

    async function init() {
      let base: Stock[] | null = null;

      try {
        base = await loadPortfolio(userId);
      } catch {
        if (activeRef.current) {
          setNotice("Could not reach the database. Showing locally saved data.");
        }
        base = readLocalPortfolio();
      }

      if (base === null) {
        base = readLocalPortfolio() ?? initialStockData;
      }

      if (!activeRef.current) {
        return;
      }

      setStockData(recalculatePercentages(base));
      setLoading(false);
      if (Date.now() - lastAutoRefresh.at > AUTO_REFRESH_COOLDOWN) {
        lastAutoRefresh.at = Date.now();
        refreshMarket(base);
      } else {
        loadSeries(base.map((stock) => stock.ticker));
      }
    }

    init();

    return () => {
      activeRef.current = false;
    };
  }, [userId, refreshMarket, loadSeries]);

  useEffect(() => {
    if (loading) {
      return;
    }

    writeLocalPortfolio(stockData);
    savePortfolio(userId, stockData).catch(() => {
      setNotice("Changes are saved locally but could not sync to your account.");
    });
  }, [stockData, loading, userId]);

  useEffect(() => {
    if (!loading) {
      onDataChange({ stocks: stockData, quotes, series, updatedAt });
    }
  }, [stockData, quotes, series, updatedAt, loading, onDataChange]);

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

  function handleAvgCostChange(ticker: string, newAvgCost: string) {
    setStockData((prev) =>
      prev.map((stock) =>
        stock.ticker === ticker ? { ...stock, avgCost: Number(newAvgCost) || 0 } : stock
      )
    );
  }

  function handleRemoveStock(ticker: string) {
    const removed = stockData.find((stock) => stock.ticker === ticker);
    setStockData((prev) =>
      recalculatePercentages(prev.filter((stock) => stock.ticker !== ticker))
    );
    if (removed) {
      setToast({ message: `Removed ${removed.ticker} from your portfolio.`, removed });
    }
  }

  function handleUndoRemove() {
    const removed = toast?.removed;
    if (removed) {
      setStockData((prev) => recalculatePercentages([...prev, removed]));
    }
    setToast(null);
  }

  function handleAddStock(stock: Stock, quote: Quote) {
    let added = false;
    setStockData((prev) => {
      if (prev.some((item) => item.ticker === stock.ticker)) {
        return prev;
      }
      added = true;
      return recalculatePercentages([...prev, stock]);
    });
    if (added) {
      setQuotes((prev) => ({ ...prev, [stock.ticker]: quote }));
      loadSeries([stock.ticker]);
      setToast({ message: `Added ${stock.ticker}. Set a quantity to track its value.` });
    } else {
      setToast({ message: `${stock.ticker} is already in your portfolio.` });
    }
  }

  function handleExportCsv() {
    const blob = new Blob([toCsv(stockData)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const closeToast = useCallback(() => setToast(null), []);

  if (loading) {
    return (
      <div className="app-card">
        <div className="skeleton mb-3" style={{ height: "38px" }}></div>
        <div className="skeleton mb-2" style={{ height: "48px" }}></div>
        <div className="skeleton mb-2" style={{ height: "48px" }}></div>
        <div className="skeleton" style={{ height: "48px" }}></div>
      </div>
    );
  }

  return (
    <div className="app-card">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
        <div>
          <h2 className="h6 mb-0">Holdings</h2>
          <span className="small text-app-muted">
            {updatedAt
              ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "Waiting for live prices..."}
          </span>
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => refreshMarket(stockData)}
            disabled={refreshing}
          >
            <i className={`bi bi-arrow-clockwise ${refreshing ? "spin" : ""}`} aria-hidden="true"></i>{" "}
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleExportCsv}
            disabled={stockData.length === 0}
          >
            <i className="bi bi-download" aria-hidden="true"></i> CSV
          </button>
        </div>
      </div>

      <SearchBar onAddStock={handleAddStock} />

      {notice && (
        <p className="alert alert-warning py-2 small" role="status">
          {notice}
        </p>
      )}

      {stockData.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-briefcase display-6 text-app-muted" aria-hidden="true"></i>
          <p className="mt-3 mb-1 fw-semibold">Your portfolio is empty</p>
          <p className="small text-app-muted mb-0">
            Search for a company above and add your first stock.
          </p>
        </div>
      ) : (
        <div className="table-scroll table-responsive">
          <table className="table table-hover align-middle tabular-nums">
            <caption className="visually-hidden">Your stock portfolio holdings</caption>
            <thead>
              <tr>
                <th scope="col">Holding</th>
                <th scope="col" className="text-end">Price</th>
                <th scope="col" className="text-end">Day</th>
                <th scope="col" className="text-center d-none d-sm-table-cell">30 days</th>
                <th scope="col">Qty</th>
                <th scope="col">Buy price</th>
                <th scope="col" className="text-end">Value</th>
                <th scope="col" className="text-end">Gain / loss</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((row) => {
                const quote = quotes[row.ticker];
                const gain = (row.price - row.avgCost) * row.quantity;
                const gainPercent = row.avgCost > 0 ? ((row.price - row.avgCost) / row.avgCost) * 100 : 0;
                return (
                  <tr key={row.ticker}>
                    <th scope="row">
                      <span className="d-block">{row.ticker}</span>
                      <span
                        className="d-block small text-app-muted fw-normal text-truncate holding-name"
                        title={row.name}
                      >
                        {row.name}
                      </span>
                    </th>
                    <td className="text-end">{formatCurrency(row.price)}</td>
                    <td className={`text-end small ${quote ? (quote.percentChange >= 0 ? "text-gain" : "text-loss") : "text-app-muted"}`}>
                      {quote ? formatSignedPercent(quote.percentChange, 1) : "-"}
                    </td>
                    <td className="text-center d-none d-sm-table-cell">
                      <Sparkline
                        values={series[row.ticker] ?? []}
                        label={`${row.ticker} price trend over the last 30 days`}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        className="form-control form-control-sm qty-input"
                        value={row.quantity}
                        onChange={(e) => handleQuantityChange(row.ticker, e.target.value)}
                        aria-label={`Quantity of ${row.ticker}`}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-control form-control-sm qty-input"
                        value={row.avgCost}
                        onChange={(e) => handleAvgCostChange(row.ticker, e.target.value)}
                        aria-label={`Buy price of ${row.ticker}`}
                      />
                    </td>
                    <td className="text-end">{formatCurrency(row.value)}</td>
                    <td className={`text-end small ${gain >= 0 ? "text-gain" : "text-loss"}`}>
                      {row.quantity > 0
                        ? `${formatSignedCurrency(gain)} (${formatSignedPercent(gainPercent, 1)})`
                        : "-"}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemoveStock(row.ticker)}
                        aria-label={`Remove ${row.ticker} from your portfolio`}
                      >
                        <i className="bi bi-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          onClose={closeToast}
          actionLabel={toast.removed ? "Undo" : undefined}
          onAction={toast.removed ? handleUndoRemove : undefined}
        />
      )}
    </div>
  );
}

export default Table;
