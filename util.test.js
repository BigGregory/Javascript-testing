const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
  const text = generateText('Greg', 35);
  expect(text).toBe('Greg (35 years old)');
});

// Integration test
test('should generate a valid text output', () => {
  const text = checkAndGenerate('Greg', 35);
  expect(text).toBe('Greg (35 years old)');
});

//e2e test
test('should create an element with text and correct class ', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // args: ['--window-size=1920,1080'],
  });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:5500/index.html');
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '56');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', (el) => el.textContent);
  expect(finalText).toBe('Anna (56 years old)');
}, 10000);
