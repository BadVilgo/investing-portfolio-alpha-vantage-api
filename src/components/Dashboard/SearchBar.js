import React, { useState, useEffect } from "react";

function SearchBar({ onAddStock }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const apiKey = "94050ca4986345e4a0cdf9eeaa310f51";

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetch(
        `https://api.twelvedata.com/symbol_search?symbol=${searchTerm}&apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            setSearchResults(data.data);
          } else {
            setSearchResults([]);
          }
        })
        .catch((error) => console.error(error));
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, apiKey]);

  function handleSelectStock(selectedStock) {
    console.log("onAddStock in SearchBar:", onAddStock);
    if (typeof onAddStock !== "function") {
      console.error("onAddStock is not a function");
      return;
    }

    const symbol = selectedStock.symbol;
    const name = selectedStock.instrument_name || selectedStock.name || symbol;

    fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        const price = parseFloat(data.price) || 0;
        const newStock = {
          ticker: symbol,
          name: name,
          price: price,
          quantity: 0,
          value: 0,
          percentage: 0,
        };
        onAddStock(newStock);
        setSearchTerm("");
        setSearchResults([]);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or ticker..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchResults.length > 0 && (
        <ul
          className="list-group"
          style={{
            maxHeight: "200px", // Adjust height as needed
            overflowY: "auto",
          }}
        >
          {searchResults.map((result, index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {result.symbol} - {result.instrument_name || result.name}
                </span>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleSelectStock(result)}
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
