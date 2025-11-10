import { test, expect } from '@playwright/test';
import { closeCookies } from '../helpers/cookies';

test('Проверка главной страницы avast.com внутри ASB', async ({ page }) => {
  await page.goto('https://avast.com');
  await closeCookies(page);

  // Проверяем, что заголовок содержит "Avast"
  await expect(page).toHaveTitle(/Avast/i);

  // Проверяем, что шапка сайта видима
  await expect(page.getByRole('banner')).toBeVisible();

  // Проверяем, что на странице есть хотя бы одна кнопка CTA
  const button = page.getByRole('button').first();
  await expect(button).toBeVisible();
});
