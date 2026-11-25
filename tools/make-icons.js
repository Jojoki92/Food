// Erzeugt die App-Icons aus tools/icon.html: node tools/make-icons.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const out = path.join(__dirname, '..', 'site');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + path.join(__dirname, 'icon.html'));
  await p.waitForFunction(() => window.__icons);
  const icons = await p.evaluate(() => window.__icons);
  const save = (file, url) => fs.writeFileSync(file, Buffer.from(url.split(',')[1], 'base64'));
  save(path.join(out, 'icon-512.png'), icons[512]);
  save(path.join(out, 'icon-192.png'), icons[192]);
  save(path.join(out, 'apple-touch-icon.png'), icons[180]);
  save(path.join(out, 'favicon-32.png'), icons[32]);
  if (process.argv[2]) save(process.argv[2], icons[1024]);
  await b.close();
  console.log('icons written');
})();
