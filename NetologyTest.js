const { chromium } = require("playwright");
const { test, expect } = require('@playwright/test');
const { USER_EMAIL, USER_PASSWORD } = require('./user.js');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 5000,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto("https://netology.ru");
  await page.click("text=Каталог курсов");
  await page.pause();

  //assertion
  await browser.close();
})();
