import { useEffect, useState } from "react";
import type { Quote, Stock, SymbolSearchResult } from "../../types";
import { fetchQuotes, searchSymbols } from "../../lib/twelveData";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchBarProps {
  onAddStock: (stock: Stock, quote: Quote) => void;
}

function SearchBar({ onAddStock }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SymbolSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    if (debouncedTerm.trim().length < 2) {
      setSearchResults([]);
      setError("");
      return;
    }

    let active = true;
    setLoading(true);
    setError("");

    searchSymbols(debouncedTerm)
      .then((results) => {
        if (active) {
          setSearchResults(results);
        }
      })
      .catch(() => {
        if (active) {
          setError("Could not load results. Please try again.");
          setSearchResults([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [debouncedTerm]);

  const handleSelectStock = async (selected: SymbolSearchResult) => {
    const symbol = selected.symbol;
    const name = selected.instrument_name || selected.name || symbol;

    try {
      const quotes = await fetchQuotes([symbol]);
      const quote = quotes[symbol];
      if (!quote) {
        setError("Could not load a price for this stock. Please try again.");
        return;
      }
      onAddStock(
        {
          ticker: symbol,
          name,
          price: quote.close,
          avgCost: quote.close,
          quantity: 0,
          value: 0,
          percentage: 0,
        },
        quote
      );
      setSearchTerm("");
      setSearchResults([]);
    } catch {
      setError("Could not add this stock. Please try again.");
    }
  };

  return (
    <div className="searchbar position-relative mb-3">
      <label htmlFor="stock-search" className="visually-hidden">
        Search stocks by name or ticker
      </label>
      <input
        id="stock-search"
        type="text"
        className="form-control"
        placeholder="Search by name or ticker..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoComplete="off"
        aria-describedby="stock-search-status"
      />

      <p id="stock-search-status" className="visually-hidden" role="status" aria-live="polite">
        {loading ? "Searching" : `${searchResults.length} results available`}
      </p>

      {loading && <p className="text-app-muted small mt-1 mb-0">Searching...</p>}
      {error && (
        <p className="text-loss small mt-1 mb-0" role="alert">
          {error}
        </p>
      )}

      {searchResults.length > 0 && (
        <ul className="list-group search-results position-absolute z-3 shadow">
          {searchResults.map((result) => (
            <li key={`${result.symbol}-${result.exchange ?? ""}`} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <span className="text-truncate">
                  {result.symbol} - {result.instrument_name || result.name}
                </span>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSelectStock(result)}
                  aria-label={`Add ${result.symbol} to your portfolio`}
                >
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
