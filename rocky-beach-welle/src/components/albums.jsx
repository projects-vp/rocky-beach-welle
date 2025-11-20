import React, { useEffect, useState } from "react";

function AlbumList({ searchValue }) {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 50; /* Anzahl Alben pro Anfrage */

  /* Token beziehen */
  async function fetchToken() {
    try {
      const res = await fetch("http://localhost:3002/refresh_token");
      const data = await res.json();
      return data.access_token;
    } catch (err) {
      console.error("Token-Fehler:", err);
      return null;
    }
  }
  /* Daten der Alben beziehen */
  async function fetchAlbums(accessToken, x = 0, y = 50) {
    try {
      let artistID = "3meJIgRw7YleJrmbpbJK6S";

      const res = await fetch(
        `https://api.spotify.com/v1/artists/${artistID}/albums?limit=${y}&offset=${x}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      return data.items || [];
    } catch (err) {
      console.error("Album-Fehler:", err);
      return [];
    }
  }

  useEffect(() => {
    async function load() {
      const accessToken = await fetchToken();
      if (!accessToken) return;
      /* Access Token in State gesetzt */
      setToken(accessToken);
      /* Alben abfragen */
      const items = await fetchAlbums(accessToken);
      setAlbums(items);
    }

    load();
  }, []);

  /* Vorbereitung Suchfilter, wenn kein value -> alle Alben anzeigen */
  const filtered = albums.filter((album) =>
    album.name?.toLowerCase().includes(searchValue?.toLowerCase() || "")
  );

  /* Funktion für Button für weitere Alben laden */
  async function ladeAlben() {
    const newOffset = offset + limit; /* Start zum Laden neuer Alben */
    const moreAlbums = await fetchAlbums(token, newOffset, limit);
    setAlbums((prev) => [
      ...prev,
      ...moreAlbums,
    ]); /* neue Alben hinten anhängen */
    setOffset(newOffset);
  }
  /* Ausgabe der Alben als Liste */
  return (
    <div>
      <ul className="episode-list">
        {filtered.map((album) => (
          <li key={album.id} className="episode">
            <img src={album.images?.[0]?.url} alt={album.name} width="100%" />
            <p className="episode-title">{album.name}</p>
            <p>{album.release_date}</p>
          </li>
        ))}
      </ul>
      <button onClick={ladeAlben}>mehr Alben laden</button>
    </div>
  );
}

export default AlbumList;
