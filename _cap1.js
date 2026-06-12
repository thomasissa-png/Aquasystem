const { chromium } = require('playwright');
const dir = '/home/user/Aquasystem/tests/screenshots/perception/';
(async () => {
  const b = await chromium.launch();
  // DESKTOP 1280
  const d = await b.newContext({ viewport:{width:1280,height:800}, deviceScaleFactor:2 });
  const pg = await d.newPage();

  // 1. ACCUEIL hero netteté
  await pg.goto('http://localhost:3500/', {waitUntil:'networkidle'});
  await pg.waitForTimeout(800);
  await pg.screenshot({path:dir+'p10-accueil-desktop-fold.png', clip:{x:0,y:0,width:1280,height:800}});
  // zoom piqué : clip serré 640px milieu, scale 2 -> piqué visible
  await pg.screenshot({path:dir+'p10-accueil-desktop-zoom.png', clip:{x:320,y:200,width:640,height:420}});

  // 2. PISCINES hero
  await pg.goto('http://localhost:3500/piscines-bien-etre', {waitUntil:'networkidle'});
  await pg.waitForTimeout(800);
  await pg.screenshot({path:dir+'p10-piscines-desktop-fold.png', clip:{x:0,y:0,width:1280,height:800}});
  await pg.screenshot({path:dir+'p10-piscines-desktop-zoom.png', clip:{x:320,y:150,width:640,height:420}});

  // 3. JARDINS hero
  await pg.goto('http://localhost:3500/jardins-paysage', {waitUntil:'networkidle'});
  await pg.waitForTimeout(800);
  await pg.screenshot({path:dir+'p10-jardins-desktop-fold.png', clip:{x:0,y:0,width:1280,height:800}});
  await pg.screenshot({path:dir+'p10-jardins-desktop-zoom.png', clip:{x:320,y:150,width:640,height:420}});

  await b.close();
  console.log('lot1 done');
})();
