// Renders the images for the GitHub profile README (github.com/Kenveil) into
// apps/web/public/github/, served from https://kenveil.com/github/. Uses the Chrome on this machine,
// the official mark, Mona Sans and the app's own Lucide icons; no rings, one soft light.
//   node docs/github-profile/render.mjs
import { mkdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const fromWeb = createRequire(join(root, 'apps/web/package.json'));
const fromDesktop = createRequire(join(root, 'apps/desktop/package.json'));
const { chromium } = fromWeb('playwright-core');
const React = fromDesktop('react');
const { renderToStaticMarkup } = fromDesktop('react-dom/server');
const lucide = fromDesktop('lucide-react');

const out = join(root, 'apps/web/public/github');
mkdirSync(out, { recursive: true });
const mark = `data:image/png;base64,${readFileSync(join(root, 'packages/web-ui/src/brand/kenveil-mark.png')).toString('base64')}`;
const font = readFileSync(join(root, 'tools/login-film/public/mona-sans.woff2')).toString('base64');
const icon = (name, size = 22) => renderToStaticMarkup(React.createElement(lucide[name], { size, strokeWidth: 1.5 }));

const base = `
@font-face { font-family: Mona; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 200 900; font-stretch: 75% 125%; }
* { box-sizing: border-box; margin: 0; }
html, body { background: transparent; }
body { font-family: Mona, 'Segoe UI', sans-serif; color: #eef0f2; }
.panel { position: relative; overflow: hidden; border: 1px solid rgba(255,255,255,.09); border-radius: 22px;
  background: radial-gradient(70% 90% at 82% 30%, rgba(214,220,228,.09), transparent 60%), linear-gradient(180deg, #15171b, #0b0c0f); }
.wordmark { display: flex; align-items: center; gap: 14px; font-weight: 680; font-stretch: 120%; letter-spacing: .34em; font-size: 17px; }
.wordmark img { width: 40px; height: 40px; border-radius: 50%; background: #000; }
.muted { color: #8d939c; }
.steel { color: #9fb6d8; }
`;

const pages = {
  banner: {
    size: [1280, 470],
    html: `
<div class="panel banner">
  <img class="big" src="${mark}" alt="">
  <div class="text">
    <div class="wordmark"><img src="${mark}" alt="">KENVEIL</div>
    <h1>Decide how much<br>of you is visible.</h1>
    <p class="lead">A privacy app for Windows that maps how your own accounts connect, ranks the fixes that close the most paths, and shows your new score before you change a thing.</p>
    <ul class="facts">
      <li>${icon('Monitor', 16)} Windows 10 and 11</li>
      <li>${icon('LayoutGrid', 16)} 11 tools, one license</li>
      <li>${icon('Server', 16)} Servers in the EU</li>
      <li>${icon('ShieldCheck', 16)} Built by an independent researcher</li>
    </ul>
  </div>
</div>`,
    css: `
.banner { width: 1280px; height: 470px; padding: 50px 60px; }
.big { position: absolute; right: -70px; top: 50%; width: 470px; height: 470px; transform: translateY(-50%); border-radius: 50%; background: #000;
  box-shadow: 0 40px 120px -20px rgba(0,0,0,.95); }
.text { position: relative; max-width: 860px; }
h1 { margin-top: 32px; font-size: 58px; line-height: 1.02; font-weight: 640; font-stretch: 118%; letter-spacing: -.035em;
  background: linear-gradient(180deg, #ffffff, #b9bec6); -webkit-background-clip: text; color: transparent; }
.lead { margin-top: 20px; max-width: 600px; color: #a3a9b1; font-size: 18px; line-height: 1.55; }
.facts { display: flex; flex-wrap: nowrap; gap: 8px; margin-top: 26px; padding: 0; list-style: none; }
.facts li { display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; white-space: nowrap; border: 1px solid rgba(255,255,255,.1); border-radius: 999px;
  background: rgba(255,255,255,.035); color: #c9cdd3; font-size: 14px; }
.facts svg { color: #9fb6d8; }`,
  },
  tools: {
    size: [1280, 0],
    html: `
<div class="panel tools">
  <div class="head">
    <h2>One license. Eleven tools.</h2>
    <p class="muted">Everything runs from accounts you prove are yours. Nobody else can be looked up.</p>
  </div>
  <div class="grid">
    ${[
      ['Waypoints', 'Graph', 'How your accounts, handles, links and public details connect.'],
      ['SlidersHorizontal', 'Simulator and Fixes', 'Fixes ranked by impact, with your new score before you change anything.'],
      ['Route', 'Paths', 'The chains of public signals that link your groups, strongest first.'],
      ['Split', 'Split', 'Decide which parts of your online life stay apart.'],
      ['ImageOff', 'Post', 'What a photo gives away, and a clean copy saved on your PC.'],
      ['Radar', 'Watch', 'Scheduled re-scans that tell you when something new turns up.'],
      ['History', 'Reborn', 'Guided removals from people-search sites, checked again later.'],
      ['Mail', 'Canary', 'A unique email address per site, so you know who leaked yours.'],
      ['Copy', 'Mirror', 'Finds accounts that imitate yours.'],
      ['Lock', 'Lock', 'A calm, step-by-step plan when your privacy was compromised.'],
      ['Network', 'Relay and Routes', 'Your traffic through the Kenveil server over WireGuard.'],
    ]
      .map(([i, t, d]) => `<div class="tool"><span class="ico">${icon(i)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`)
      .join('')}
    <div class="tool new"><span class="ico">${icon('Sparkles')}</span><div><h3>New in 0.2.0</h3><p>Connect hub, a browser extension that pairs itself, and a read-only Inbox without trackers.</p></div></div>
  </div>
</div>`,
    css: `
.tools { width: 1280px; padding: 46px 48px 48px; }
.head { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 30px; }
h2 { font-size: 34px; font-weight: 640; font-stretch: 115%; letter-spacing: -.02em; }
.head p { font-size: 16px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tool { display: flex; gap: 16px; padding: 20px; border: 1px solid rgba(255,255,255,.07); border-radius: 16px; background: rgba(255,255,255,.025); }
.tool.new { border-color: rgba(159,182,216,.35); background: rgba(159,182,216,.07); }
.ico { display: grid; flex: none; place-items: center; width: 44px; height: 44px; border: 1px solid rgba(255,255,255,.1); border-radius: 12px; color: #c3c8cf; }
.new .ico { color: #9fb6d8; border-color: rgba(159,182,216,.4); }
h3 { font-size: 17px; font-weight: 620; }
.tool p { margin-top: 5px; color: #8d939c; font-size: 14.5px; line-height: 1.45; }`,
  },
  principles: {
    size: [1280, 0],
    html: `
<div class="panel principles">
  <h2>How Kenveil treats your data</h2>
  <div class="grid">
    ${[
      ['UserCheck', 'Only your own accounts', 'Scans start from accounts you verified. There is no field to look up anyone else.'],
      ['KeyRound', 'Encrypted with your key', 'Accounts, scans and alerts are encrypted with a key unique to your account.'],
      ['ListChecks', 'Everything written down', 'The Ledger lists every piece of data: where it lives, why, and for how long.'],
      ['Server', 'EU servers, no trackers', 'Servers in Spain. The website loads nothing from other companies.'],
      ['Laptop', 'Nothing hidden on your PC', 'No admin rights, no Windows service, no kernel driver.'],
      ['Hash', 'Checkable downloads', 'Every installer is published with its SHA-256 checksum.'],
    ]
      .map(([i, t, d]) => `<div class="item"><span class="ico">${icon(i, 20)}</span><h3>${t}</h3><p>${d}</p></div>`)
      .join('')}
  </div>
</div>`,
    css: `
.principles { width: 1280px; padding: 46px 48px 48px; }
h2 { margin-bottom: 30px; font-size: 34px; font-weight: 640; font-stretch: 115%; letter-spacing: -.02em; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 34px 40px; }
.item { padding-top: 18px; border-top: 1px solid rgba(255,255,255,.09); }
.ico { color: #9fb6d8; }
h3 { margin-top: 12px; font-size: 18px; font-weight: 620; }
.item p { margin-top: 6px; color: #8d939c; font-size: 15px; line-height: 1.5; }`,
  },
};

const buttons = [
  ['download', 'Download for Windows', 'Download', true],
  ['website', 'kenveil.com', 'Globe', false],
  ['trust', 'Trust report', 'ShieldCheck', false],
  ['discord', 'Discord support', 'MessagesSquare', false],
];

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 2 });
const shoot = async (name, html, css, selector) => {
  await page.setContent(`<!doctype html><html><head><style>${base}${css}</style></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator(selector).screenshot({ path: join(out, `${name}.png`), omitBackground: true });
  console.log(`github/${name}.png`);
};
for (const [name, { html, css }] of Object.entries(pages)) await shoot(name, html, css, '.panel');
for (const [name, label, ic, primary] of buttons) {
  await shoot(
    `button-${name}`,
    `<span class="btn${primary ? ' primary' : ''}">${icon(ic, 18)}${label}</span>`,
    `.btn { display: inline-flex; align-items: center; gap: 10px; height: 46px; padding: 0 20px; border: 1px solid rgba(255,255,255,.14); border-radius: 12px;
      background: #121419; color: #eef0f2; font-size: 16px; font-weight: 600; }
     .btn svg { color: #9fb6d8; }
     .primary { border-color: #e9ecef; background: linear-gradient(180deg, #f3f5f7, #c9ced5); color: #0b0c0f; }
     .primary svg { color: #0b0c0f; }`,
    '.btn',
  );
}
await browser.close();
