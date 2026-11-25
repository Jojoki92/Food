// Zeichnet Startbild (start.jpg) und App-Symbole (site/*.png): node tools/render.js
const { chromium } = require('playwright'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
(async () => {
  const b = await chromium.launch(), p = await b.newPage();
  for (const [hash, dir] of [['', root], ['#icon', path.join(root, 'site')]]) {
    await p.goto('file://' + path.join(__dirname, 'art.html') + hash);
    await p.reload(); // Hash-Wechsel allein lädt die Seite nicht neu
    const out = await (await p.waitForFunction(() => window.__out)).jsonValue();
    for (const [name, url] of Object.entries(out)) fs.writeFileSync(path.join(dir, name), Buffer.from(url.split(',')[1], 'base64'));
  }
  await b.close();
})();
