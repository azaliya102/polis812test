// @ts-check
import { test, expect } from '@playwright/test';

//checking that link leads to the right page
test('has title', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  await expect(page).toHaveTitle(/vakuu/);
});

//the 'right' button is not clickable, so if this test passes it confirms that clicking the button has no effect
test('should not change the page content after clicking the button', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = await page.locator('//*[@id="app"]/div[2]/div[6]/div[2]/span[2]');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const elementsBeforeClick = await page.locator('*').count();
  await button.click();
  const elementsAfterClick = await page.locator('*').count();
  expect(elementsBeforeClick).toBe(elementsAfterClick);
});

//this test checks the email box, error message has a typo, "Wrog" instead of "Wrong"
test('should show the error mesasage after entering a wrong email adress', async ({page}) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const emailAdressButton = await page.locator('//*[@id="app"]/footer/div[1]/div[4]/div/div/input');
  const submitEmailButton = await page.locator('//*[@id="app"]/footer/div[1]/div[4]/div/div/div');
  const errorMessage = await page.locator('//*[@id="swal2-content"]');
  await expect(emailAdressButton).toBeVisible();
  await emailAdressButton.fill('testtest');
  await submitEmailButton.click();
  await expect(errorMessage).toBeVisible();
  const text = await errorMessage.textContent();
  expect(text).toContain('Wrog');
});

test('The page text does not change after changing the language', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const langSelector = page.locator('//*[@id="app"]/div[1]/select');
  const header = page.locator('h1'); // Укажите селектор заголовка
  const initialText = await header.innerText();
  await langSelector.selectOption('fin');
  await page.waitForTimeout(1000);
  const newText = await header.innerText();
  expect(newText).toBe(initialText);
});

test('flag does not change after selecting another language', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const langSelector = page.locator('.header__lang');
  const flagElement = page.locator('.header__lang');
  const initialFlag = await flagElement.evaluate(el => getComputedStyle(el).backgroundImage);
  await langSelector.selectOption('fin');
  await page.waitForTimeout(1000);
  const afterChangeFlag = await flagElement.evaluate(el => getComputedStyle(el).backgroundImage);
  expect(afterChangeFlag).toBe(initialFlag);
});

test('Ссылка в футере не работает', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');

  const footerLink = page.locator('//*[@id="app"]/footer/div[2]/div[1]/a[1]');
  const href = await footerLink.getAttribute('href');

  expect(href).not.toBeNull();
  expect(href).not.toBe('#');
  expect(href).not.toBe('');
});
