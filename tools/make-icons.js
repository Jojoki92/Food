// Erzeugt die App-Icons für die Netlify-Version: node tools/make-icons.js
const { chromium } = require('playwright');
const path = require('path');
const out = path.join(__dirname, '..', 'site');
const html = size => `<!doctype html><html><head>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&display=swap">
<style>html,body{margin:0}body{width:${size}px;height:${size}px;display:grid;place-items:center;
background:radial-gradient(circle at 30% 25%,#2f4a39,#1a2c21 70%);font-family:"Bricolage Grotesque",sans-serif}
b{font-weight:800;font-size:${size * 0.5}px;line-height:1;letter-spacing:-.04em;color:#f4f1e8;transform:translate(${size * 0.02}px,-${size * 0.02}px)}
b i{font-style:normal;color:#f0b748}</style></head><body><b>N<i>.</i></b></body></html>`;
(async () => {
  const b = await chromium.launch();
  for (const [name, size] of [['icon-512.png', 512], ['icon-192.png', 192], ['apple-touch-icon.png', 180], ['favicon-32.png', 32]]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(html(size)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(out, name) }); await p.close();
  }
  await b.close();
  console.log('icons written');
})();
