import { test, expect } from '@playwright/test';

test('ASB запускается и открывает avast.com', async ({ page }) => {
  await page.goto('https://avast.com');
  await expect(page).toHaveTitle(/Avast/i);
});
