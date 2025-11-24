import "./App.css";
import AlbumList from "./components/albums";
import Search from "./components/search";
import React, { useState } from "react";
import ScrollButton from "./components/scrollbutton";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div>
      <div className="container mt-4 background">
        <header>
          <h1>Rocky Beach Welle</h1>
          <p className="subtitle">
            Fanprojekt zu den Drei ??? - Alle Alben auf Spotify
          </p>
          <div className="d-flex mt-4 mb-4 gap-3 filters">
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            <button
              type="button"
              className={`btn btn-primary ${!filterActive ? "" : "inactive"}`}
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
          <ScrollButton />
        </main>
      </div>
      <footer>
        <div className="container">
          <p>
            Diese Website ist ein nicht-kommerzielles Fanprojekt im Rahmen einer
            Weiterbildung. „Die drei ???“ ist eine eingetragene Marke der
            Franckh-Kosmos Verlags-GmbH & Co. KG. Alle Hörspiel-Cover und
            Inhalte stammen über die offizielle Spotify-API und bleiben Eigentum
            ihrer jeweiligen Rechteinhaber. Diese Seite steht in keiner
            Verbindung zu Kosmos, Europa oder Spotify.
          </p>
          <p className="small">
            Favicon von &nbsp;
            <a
              href="https://www.flaticon.com/free-icon/wave_7759987"
              target="_blank"
              rel="noopener noreferrer"
            >
              Freepik - Flaticon
            </a>
          </p>
        </div>
      </footer>
        
    </div>
  );
}

export default App;
