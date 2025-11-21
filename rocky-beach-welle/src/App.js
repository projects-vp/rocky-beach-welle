import "./App.css";
import AlbumList from "./components/albums";
import Search from "./components/search";
import React, { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div className="container mt-4">
        <div className="container-fluid">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <button onClick={() => setFilterActive((prev) => !prev)}>
            {filterActive
              ? "Sonderfolgen ausgeblendet"
              : "Sonderfolgen eingeblendet"}
          </button>
        </div>
      <AlbumList searchValue={searchValue} filterActive={filterActive} />
    </div>
  );
}

export default App;
