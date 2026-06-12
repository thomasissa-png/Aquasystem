const { chromium } = require('playwright');
const base = 'http://localhost:3400';
const out = '/home/user/Aquasystem/tests/screenshots/perception/';
// args: name url device y0 [y1 ...]  -> clips of 900px height each from given y offsets
(async () => {
  const [,, name, path, device, ...ys] = process.argv;
  const vp = device === 'mobile' ? {width:390,height:844} : {width:1440,height:900};
  const browser = await chromium.launch();
  const page = await browser.newPage({viewport: vp, deviceScaleFactor: 1});
  await page.goto(base+path, {waitUntil:'networkidle'});
  await page.waitForTimeout(700);
  for (const y of ys.map(Number)) {
    await page.evaluate(yy => window.scrollTo(0, yy), y);
    await page.waitForTimeout(400);
    const h = Math.min(880, vp.height);
    await page.screenshot({path: `${out}p3-${name}-${device}-y${y}.png`, clip:{x:0,y:0,width:vp.width,height:h}});
    console.log('shot', name, device, y);
  }
  await browser.close();
})();
