import "./App.css";
import AlbumList from "./components/albums";
import Search from "./components/search";
import React, { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <button onClick={() => setFilterActive((prev) => !prev)}>
        {filterActive
          ? "Sonderfolgen ausgeblendet" : "Sonderfolgen eingeblendet"}
      </button>
      <AlbumList searchValue={searchValue} filterActive={filterActive} />
    </div>
  );
}

export default App;
