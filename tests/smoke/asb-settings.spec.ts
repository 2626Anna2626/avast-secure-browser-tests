/*
import { test, expect } from '@playwright/test';

test('Открывается страница настроек Avast Secure Browser', async ({ page }) => {
  await page.goto('avast://settings');
  await expect(page.getByText(/Settings/i)).toBeVisible();
});
*/

import { test } from '@playwright/test';

test.skip('Открытие страницы настроек Avast Secure Browser (проверяется вручную)', async () => {
  // Внутренние страницы avast:// недоступны для автоматизации через Playwright,
  // тест выполняется вручную и описан в тест-плане / Qase.
});
