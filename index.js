//Importar Playwright
const playwright = require('playwright');

const url = 'https://angular-6-registration-login-example.stackblitz.io/register';

(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {
    console.log(`${browserType} -------------------------------------------`)

    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto(url);
    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path: './page.png'})
    await page.click('css=button')
    await new Promise(r => setTimeout(r, 9000));
    await page.screenshot({path: './page2.png'})
    console.log('Project loaded')

    await page.click('css=a.btn.btn-link')
    console.log(`Clicked "cancel". URL is now ${page.url()}`)

    await page.click('css=a.btn.btn-link')
    console.log(`Clicked "register". URL is now ${page.url()}`)

    await page.click('css=button.btn.btn-primary')
    let feedback = await page.$$('css=div.invalid-feedback');

    let elems=0
    for(let i of feedback){elems++}
    await page.screenshot({path:'./form-feedback.png'})
    console.log(`Clicked "Register" with an empty form. Feedback is shown in ${elems} elements`)

    await page.type('input[formcontrolname="firstName"]', 'Monitor');
    await page.type('input[formcontrolname="lastName"]', 'Pruebas');
    await page.type('input[formcontrolname="username"]', 'pruebas');
    await page.type('input[formcontrolname="password"]', 'MISO4208');
    await page.click('css=button.btn.btn-primary')

    await new Promise(r => setTimeout(r, 7000));
    await page.screenshot({path:'./success-feedback.png'})

    feedback = await page.$("css=div.alert.alert-success")
    console.log(`Success dialog after creating user with message: ${await feedback.innerText()}`)

    await page.type('input[formcontrolname="username"]', 'pruebas');
    await page.type('input[formcontrolname="password"]', 'MISO4208');
    await page.click('css=button.btn.btn-primary')
    await new Promise(r => setTimeout(r, 7000));

    feedback = await page.$('text="Hi Monitor!"');
    await page.screenshot({path:'./after-login.png'})
    console.log(`Logged in. Your user was ${feedback?'successfully':'not'} created`)

    await browser.close();
  }
  return;
})();