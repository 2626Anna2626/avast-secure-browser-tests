import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-1] ASB запускается и открывает avast.com', async ({ page }) => {
  qase.id(4); // привязка к кейсу ASB-4

  await page.goto('https://avast.com');
  await expect(page).toHaveTitle(/Avast/i);
});
