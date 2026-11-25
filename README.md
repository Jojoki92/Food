# Nährwerk

Persönliche Rezept-App: Suche, Filter (Fleisch / Vegetarisch / Süß), Zutaten abhaken, die man schon hat (der Rest wird als Einkaufsliste kopiert), Zubereitung Schritt für Schritt und Rezepte hochladen.

**Live:** https://naehrwerk-iu1p.netlify.app

## Rezepte hochladen
Oben rechts auf „Hochladen“, Rezepttext einfügen, „Umwandeln“, prüfen, „Speichern“. Der eingebaute Leser erkennt Titel, Zutaten (mit Mengen), Zubereitung und Nährwerte und ordnet das Rezept ein (Herzhaft/Süß, Fleisch/Vegetarisch). Alles läuft in der App, ohne externe Dienste.

Gespeichert wird in der Netlify-Version im Browser des Geräts, in der Claude-Version im Speicher des Artifacts.

## Dateien
- `index.html` – die App (Quelle). Start-Rezepte im Array `RECIPES`.
- `start.jpg` – Startbild; Generator in `tools/art.html` (`node tools/render.js tools/art.html start.jpg`)
- `site/` – eigenständige Web-App für Netlify (installierbar, offline nutzbar)
- `tools/build-site.js` – baut `site/` aus `index.html` (`node tools/build-site.js`)
- `tools/make-icons.js` – erzeugt die App-Icons

## Neu veröffentlichen
`node tools/build-site.js`, dann `site/` auf Netlify deployen (Projekt `naehrwerk-iu1p`).
