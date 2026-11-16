import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/HP/AppData/Roaming/npm/node_modules/playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
const response = await page.goto('http://localhost/Portfolio/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
const details = await page.evaluate(() => ({
  status: document.readyState,
  title: document.title,
  scriptLoaded: [...document.scripts].map((script) => script.src).filter(Boolean),
  reveals: [...document.querySelectorAll('.reveal')].map((element) => ({ className: element.className, visible: getComputedStyle(element).opacity, rectTop: Math.round(element.getBoundingClientRect().top) })).slice(0, 12),
  mainSections: [...document.querySelectorAll('#root section')].map((section) => ({id: section.id, className: section.className, text: section.innerText.slice(0, 70), height: Math.round(section.getBoundingClientRect().height)})).slice(0, 20),
}));
console.log(JSON.stringify({http: response?.status(), details, errors}, null, 2));
await browser.close();
