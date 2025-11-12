import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-4] Открытие новой вкладки', async ({ page }) => {
  qase.id(7);

  // Исходная вкладка уже существует
  const context = page.context();
  const initialPagesCount = context.pages().length;

  // Открываем новую вкладку программно (моделируем поведение new tab)
  const newTab = await context.newPage();
  await newTab.goto('https://avast.com');

  await expect(newTab).toHaveTitle(/Avast/i);
  expect(context.pages().length).toBeGreaterThan(initialPagesCount);
});
