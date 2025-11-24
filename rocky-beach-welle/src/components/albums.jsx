import React, { useEffect, useState } from "react";

function AlbumList({ searchValue, filterActive }) {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 50; /* Anzahl Alben pro Anfrage */
  const [loading, setLoading] = useState(true);

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
    async function loadAll() {
      const accessToken = await fetchToken();
      if (!accessToken) return;
      /* Access Token in State gesetzt */
      setToken(accessToken);

      let allAlbums = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        /* Alle Alben abfragen */
        const items = await fetchAlbums(accessToken, offset, limit);
        allAlbums = [
          ...allAlbums,
          ...items,
        ]; /* neues Array, Komponente wird aktualisiert */
        if (items.length < limit) {
          hasMore = false;
        } else {
          offset += limit;
        }
      }
      setAlbums(allAlbums);
      setLoading(false);
    }

    loadAll();
  }, []);

  /* Vorbereitung Suchfilter, wenn kein value -> alle Alben anzeigen */
  const filtered = albums.filter((album) => {
    const matchSearch = album.name
      ?.toLowerCase()
      .includes(searchValue?.toLowerCase() || "");
    if (!filterActive) return matchSearch;

    const exclude =
      album.name?.toLowerCase().includes("liest...") ||
      album.name?.toLowerCase().includes("adventskalender") ||
      album.name?.toLowerCase().includes("sommer-fälle") ||
      album.name?.toLowerCase().includes("outro") ||
      album.name?.toLowerCase().includes("auferstehung") ||
      album.name?.toLowerCase().includes("brainwash") ||
      album.name?.toLowerCase().includes("das verfluchte schloss") ||
      album.name?.toLowerCase().includes("das geheimnis der geisterinsel") ||
      album.name?.toLowerCase().includes("hörspiel");
    /* weiterer Filterzusatz für zu lange Folgen */
    const tooManyTracks = album.total_tracks > 50;
    /* Es werden nur Alben gezeigt welche zur Sucheingabe passen, nicht über exclude ausgeschlossen werden und nicht zu viele Tracks haben. */
    return matchSearch && !exclude && !tooManyTracks;
  });
  /* Ladeanimation für Loading State */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mb-5">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Lade Folgen...</span>
        </div>
      </div>
    );
  }
  /* Ausgabe der Alben als Liste */
  return (
    <div className="grid">
      <ul className="episode-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 list-unstyled">
        {filtered.map((album) => (
          <li key={album.id} className="episode col mb-4">
            <div className="card h-100">
              <a
                href={album.external_urls?.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <img
                  src={album.images?.[0]?.url}
                  alt={album.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <p className="episode-title card-title">{album.name}</p>
                  <p className="card-text text-muted">{album.release_date}</p>
                </div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
