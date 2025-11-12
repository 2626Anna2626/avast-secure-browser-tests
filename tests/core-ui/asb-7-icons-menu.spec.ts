import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-7] Отображение основных элементов страницы в ASB', async ({ page }) => {
  qase.id(10);

  await page.goto('https://avast.com');
  await closeCookies(page);

  // Логотип или основной элемент навигации
  await expect(page.getByRole('banner')).toBeVisible();

  // Хотя бы один элемент меню/навигации
  const nav = page.getByRole('navigation').first();
  await expect(nav).toBeVisible();

  // Проверяем наличие хотя бы одной кликабельной ссылки
  const link = nav.getByRole('link').first();
  await expect(link).toBeVisible();
});
