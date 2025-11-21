import React from "react";

function Search({ searchValue, setSearchValue }) {
  return (
    <input
      type="text"
      placeholder="Folge suchen..."
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className="form-control"
    />
  );
}

export default Search;