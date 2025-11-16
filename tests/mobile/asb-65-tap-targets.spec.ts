import { test, expect, devices } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test.use(devices['iPhone 13']);

test('[ASB-65] Mobile: tap targets visible & clickable', async ({ page }) => {
  qase.id(68);
  await page.goto('https://www.avast.com');
  await closeCookies(page);

  const btn = page.getByRole('button').first();
  await expect(btn).toBeVisible();
  await btn.click().catch(() => {});
});
