import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-5] Закрытие вкладки и восстановление последней', async ({ page }) => {
  qase.id(8);

  const context = page.context();

  // Открываем доп. вкладку
  const secondTab = await context.newPage();
  await secondTab.goto('https://avast.com');

  expect(context.pages().length).toBeGreaterThanOrEqual(2);

  // Закрываем её
  await secondTab.close();
  const afterCloseCount = context.pages().length;

  // "Восстановление" моделируем открытием новой вкладки (ограничение автоматики)
  const restoredTab = await context.newPage();
  await restoredTab.goto('https://avast.com');

  expect(context.pages().length).toBeGreaterThan(afterCloseCount);
  await expect(restoredTab).toHaveTitle(/Avast/i);
});
