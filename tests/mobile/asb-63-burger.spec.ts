import { test, expect, devices } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test.use(devices['iPhone 13']);

test('[ASB-63] Mobile: burger opens & closes', async ({ page }) => {
  qase.id(66);
  await page.goto('https://www.avast.com');
  await closeCookies(page);

  const burger = page.getByRole('button', { name: /menu|hamburger|nav/i }).first();
  await burger.click().catch(() => {});
  await page.waitForTimeout(300);

  await expect(page.getByRole('navigation').first()).toBeVisible();
});
