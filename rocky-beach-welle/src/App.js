import "./App.css";
import AlbumList from "./components/albums";
import Search from "./components/search";
import React, { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div className="container mt-4">
      <header>
        <h1>Rocky Beach Welle</h1>
        <p className="subtitle">
          Fanprojekt zu den Drei ??? - Alle Alben auf Spotify
        </p>
        <div className="d-flex mt-4 mb-4 gap-3 filters">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setFilterActive((prev) => !prev)}
          >
            {filterActive
              ? "Sonderfolgen ausgeblendet"
              : "Sonderfolgen eingeblendet"}
          </button>
        </div>
      </header>
      <main>
        <AlbumList searchValue={searchValue} filterActive={filterActive} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
