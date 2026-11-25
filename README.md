# Nährwerk

Persönliche Rezept-App: Suche, Filter (Fleisch / Vegetarisch / Süß), Zutaten abhaken, die man schon hat; der Rest wird als Einkaufsliste kopiert und Zubereitung Schritt für Schritt.

- `index.html` – die App (Rezepte stehen oben im `<script>` im Array `RECIPES`)
- `start.jpg` – Startbild
- `tools/` – Generator fürs Startbild (`node tools/render.js tools/art.html start.jpg`)

Neue Rezepte: in der App oben rechts auf „Hochladen“, Text (oder Foto) einfügen, „Umwandeln“, „Speichern“. Claude liest das Rezept und ordnet es ein; ohne Claude liest ein einfacher Text-Leser das gewohnte Format. Hochgeladene Rezepte liegen im Speicher des Artifacts (Sammlung `recipes`), die 11 Start-Rezepte im Array `RECIPES`.
