const { test, expect } = require('@playwright/test');
const { USER_EMAIL, USER_PASSWORD } = require('./user.js');

test('Успешная авторизация', async ({ page }) => {
  // Открываем форму авторизации
  await page.goto('https://netology.ru/');
  await page.click('text=Войти');

  // Вводим email и пароль
  await page.fill('input[Placeholder=Email]', USER_EMAIL);
  await page.fill('input[type=password]', USER_PASSWORD);

  // Нажимаем кнопку "Войти"
  await page.click('button[data-testid="login-submit-btn"]');

  // Проверяем, что открылась страница профиля
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.locator('h2[ class="src-components-pages-Profile-Programs--title--Kw5NH"]')).toHaveText('Моё обучение');
});

test('Неуспешная авторизация', async ({ page }) => {
  // Открываем форму авторизации
  await page.goto('https://netology.ru/');
  await page.click('text=Войти');

  // Вводим невалидные email и пароль
  await page.fill('input[Placeholder=Email]', 'invalid@MediaCapabilities.com');
  await page.fill('input[type=password]', 'invalid_password');

  // Нажимаем кнопку "Войти"
  await page.click('button[data-testid="login-submit-btn"]');

  // Проверяем, что появилось сообщение об ошибке
  await expect(page.locator('div[data-testid="login-error-hint"]')).toHaveText('Вы ввели неправильно логин или пароль');
});
