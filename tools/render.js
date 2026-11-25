const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const [src, out] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 1500 } });
  await p.goto('file://' + path.resolve(src));
  await p.waitForFunction(() => window.__done === true);
  const url = await p.evaluate(() => document.getElementById('c').toDataURL('image/jpeg', 0.84));
  fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
  await b.close();
  console.log('written', out, fs.statSync(out).size);
})();
