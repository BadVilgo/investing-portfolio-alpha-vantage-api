import React, { useState, useEffect } from "react";

function SearchBar() {
  return (
    <div className="">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name or ticker..."
        />
        <button className="btn btn-outline-secondary" type="button">
          Add
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
