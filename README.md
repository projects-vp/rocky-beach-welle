<h1>Rocky Beach Welle</h1>
Eine Webseite mit Spotify-Anbindung speziell für die Drei ???

React-Projekt mit Spotify-API-Integration. 
Damit die App Daten abrufen kann, muss zuerst ein Tokenserver gestartet werden.

<h2>Repository clonen</h2>
git clone https://github.com/projects-vp/rocky-beach-welle.git

cd rocky-beach-welle

npm install

<h2>Umgebungsvariablen</h2>
Damit die Verbindung zur Spotify-API funktioniert, müssen die Zugangsdaten in einer `.env`-Datei im Ordner `token/` hinterlegt werden.  
Die Datei `.env.example` zeigt die benötigten Variablen:

CLIENT_ID=
CLIENT_SECRET=
REFRESH_TOKEN=

Trage hier deine eigenen Werte aus der [Spotify Developer Console](https://developer.spotify.com/dashboard/) ein.  
Die `.env` ist bereits in `.gitignore` eingetragen und wird nicht ins Repository übernommen.

Token Server starten
cd token

node get-token.js

<h2>React App starten</h2>
cd ..

npm start

http://localhost:3000
