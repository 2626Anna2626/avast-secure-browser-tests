import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-37] Повторный smoke-прогон после изменений', async ({ page }) => {
  qase.id(40);
  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  await closeCookies(page);
  await expect(page).toHaveTitle(/Avast/i);
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('button').first()).toBeVisible();
});
