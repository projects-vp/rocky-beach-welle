import React, { useEffect, useState } from "react";
import Search from './search';

function AlbumList({ searchValue }) {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

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
  async function fetchAlbums(accessToken) {
    try {
      const res = await fetch(
        "https://api.spotify.com/v1/artists/3meJIgRw7YleJrmbpbJK6S/albums?include_groups=album,single&market=DE&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();
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
  /* Ausgabe der Alben als Liste */
  return (
    <ul className="episode-list">
      {filtered.map((album) => (
        <li key={album.id} className="episode">
          <img src={album.images?.[0]?.url} alt={album.name} width="100%" />
          <p className="episode-title">{album.name}</p>
          <p>{album.release_date}</p>
        </li>
      ))}
    </ul>
  );
}

export default AlbumList;
