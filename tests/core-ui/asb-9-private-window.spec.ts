import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-9] Открытие приватного окна (отдельный контекст)', async ({ page, browser }) => {
  qase.id(13);

  await page.goto('https://avast.com');
  await expect(page).toHaveTitle(/Avast/i);

  // Создаем новый контекст — он изолирован от текущего
  const privateContext = await browser.newContext();
  const privatePage = await privateContext.newPage();

  await privatePage.goto('https://avast.com');
  await expect(privatePage).toHaveTitle(/Avast/i);

  await privateContext.close();
});
