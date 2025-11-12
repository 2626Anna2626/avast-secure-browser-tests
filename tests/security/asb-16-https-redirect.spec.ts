import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-16] HTTP→HTTPS редирект', async ({ page }) => {
  qase.id(19);

  await page.goto('http://avast.com', { waitUntil: 'domcontentloaded' });
  expect(page.url().startsWith('https://')).toBeTruthy();
  await expect(page).toHaveTitle(/Avast/i);
});
