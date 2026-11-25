# Meal Prep

Persönliche Rezept-App: suchen, filtern (Fleisch / Vegetarisch / Süß), Zutaten abhaken, die man schon hat (der Rest wird als Einkaufsliste kopiert), Schritte abhaken, neue Rezepte als Text hochladen.

**Live:** https://naehrwerk-iu1p.netlify.app (wird nur auf ausdrücklichen Wunsch neu hochgeladen)

## Dateien
- `index.html` – die ganze App (Aussehen, Rezept-Leser, Bedienung)
- `rezepte.txt` – die eingebauten Rezepte als normaler Text. Neues Rezept: einfach im gleichen Format dazuschreiben.
- `start.jpg` – Startbild · `tools/art.html` – zeichnet Startbild und App-Symbol, `node tools/render.js`
- `tools/build-site.js` – baut `site/` (installierbare Version für Netlify): `node tools/build-site.js`

Hochgeladene Rezepte und Häkchen speichert der Browser des jeweiligen Geräts.
