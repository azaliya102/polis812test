import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  await expect(page).toHaveTitle(/vakuu/);
});

test('should change the page content after clicking the button', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = page.locator('//*[@id="app"]/div[2]/div[6]/div[2]/span[2]');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const contentBefore = await page.locator('body').innerText();
  await button.click();
  await page.waitForTimeout(500);
  const contentAfter = await page.locator('body').innerText();
  expect(contentBefore).toBe(contentAfter);
});


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
  const header = page.locator('h1');
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

test('link in the footer does not work', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const footerLink = page.locator('//*[@id="app"]/footer/div[2]/div[1]/a[1]');
  const href = await footerLink.getAttribute('href');
  expect(href).not.toBeNull();
  expect(href).toBe('#'); //that is why the link does not work
  expect(href).not.toBe('');
});

test('Get Started button should be clickable but does nothing', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const getStartedButton = page.locator('//*[@id="app"]/div[2]/div[1]/div[2]/div[1]/button');
  await expect(getStartedButton).toBeVisible();
  await expect(getStartedButton).toBeEnabled();
  const elementsBeforeClick = await page.locator('*').count();
  await getStartedButton.click();
  const elementsAfterClick = await page.locator('*').count();
  expect(elementsBeforeClick).toBe(elementsAfterClick);
});

test('Car insurance "Calculate the price" button leads to 404', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = page.locator('//*[@id="app"]/div[2]/div[5]/div/div[1]/a');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const [newPage] = await Promise.all([
    page.waitForEvent('framenavigated'), // Ждем перехода
    button.click()
  ]);
  await expect(newPage).toHaveTitle(/404|not found/i); // Проверяем, что открылась 404-страница
});

test('Home insurance "Calculate the price" button leads to 404', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = page.locator('//*[@id="app"]/div[2]/div[5]/div/div[2]/a');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const [newPage] = await Promise.all([
    page.waitForEvent('framenavigated'),
    button.click()
  ]);
  await expect(newPage).toHaveTitle(/404|not found/i);
});

test('Travel insurance "Calculate the price" button leads to 404', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = page.locator('//*[@id="app"]/div[2]/div[5]/div/div[3]/a');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const [newPage] = await Promise.all([
    page.waitForEvent('framenavigated'),
    button.click()
  ]);
  await expect(newPage).toHaveTitle(/404|not found/i);
});

test('Pet insurance "Calculate the price" button leads to 404', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const button = page.locator('//*[@id="app"]/div[2]/div[5]/div/div[4]/a');
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  const [newPage] = await Promise.all([
    page.waitForEvent('framenavigated'),
    button.click()
  ]);
  await expect(newPage).toHaveTitle(/404|not found/i);
});

test('Choose Insurance button leads to development page', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const chooseInsuranceButton = page.locator('//*[@id="app"]/div[2]/div[8]/button');
  await expect(chooseInsuranceButton).toBeVisible();
  await chooseInsuranceButton.click();
  await expect(page).toHaveURL(/insurance/);
  const devMessage = page.locator('//*[@id="app"]/div[2]/p');
  await expect(devMessage).toBeVisible();
});

test('Empty email submission should not show "Successfully send"', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const submitEmailButton = page.locator('//*[@id="app"]/footer/div[1]/div[4]/div/div/div');
  await submitEmailButton.click();
  const successMessage = page.locator('//*[@id="swal2-content"]');
  await expect(successMessage).toBeVisible();
  const text = await successMessage.textContent();
  expect(text).not.toContain('Successfully send');
});

test('should incorrectly accept an invalid email address', async ({ page }) => {
  await page.goto('https://polis812.github.io/vacuu/');
  const emailInput = page.locator('//*[@id="app"]/footer/div[1]/div[4]/div/div/input');
  const submitButton = page.locator('//*[@id="app"]/footer/div[1]/div[4]/div/div/div');
  const successMessage = page.locator('//*[@id="swal2-content"]');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('testietest@invalid.domain');
  await submitButton.click();
  await expect(successMessage).toBeVisible();
  const text = await successMessage.textContent();
  expect(text).toContain('You have successfully subscribed');
});

