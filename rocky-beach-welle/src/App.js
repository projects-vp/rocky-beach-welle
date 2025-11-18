import "./App.css";
import AlbumList from "./components/albums";
import Search from "./components/search";
import React, { useState } from "react";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <AlbumList searchValue={searchValue} />
    </div>
  );
}


export default App;
