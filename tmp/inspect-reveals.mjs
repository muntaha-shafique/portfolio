import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/HP/AppData/Roaming/npm/node_modules/playwright');
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto('http://localhost/Portfolio/', { waitUntil: 'networkidle' });
await page.locator('#about').scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);
const details = await page.evaluate(() => ({
  scrollY: window.scrollY,
  bodyClass: document.body.className,
  title: [...document.querySelectorAll('.reveal')].map((element) => ({className: element.className, opacity: getComputedStyle(element).opacity, top: Math.round(element.getBoundingClientRect().top)})).slice(0, 6),
  footerClass: document.querySelector('.footer')?.className,
}));
await page.screenshot({path:'tmp/about-after-scroll.png', fullPage:false});
console.log(JSON.stringify({details,errors},null,2));
await browser.close();
