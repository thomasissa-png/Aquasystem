const { chromium } = require('playwright');
const base = 'http://localhost:3400';
(async () => {
  const [,, path, device] = process.argv;
  const vp = device === 'mobile' ? {width:390,height:844} : {width:1440,height:900};
  const b = await chromium.launch();
  const p = await b.newPage({viewport: vp});
  await p.goto(base+path,{waitUntil:'networkidle'});
  await p.waitForTimeout(600);
  const h = await p.evaluate(()=>document.body.scrollHeight);
  console.log(device, 'scrollHeight=', h);
  await b.close();
})();
