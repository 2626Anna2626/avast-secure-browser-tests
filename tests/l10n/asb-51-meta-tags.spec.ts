import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-51] L10n: title/description localized', async ({ page }) => {
  qase.id(54);
  await page.goto('https://www.avast.com/cs-cz/');
  await closeCookies(page);

  await expect(page).toHaveTitle(/.+/);
  const desc = await page.locator('meta[name="description"]').getAttribute('content');
  expect(desc && desc.length > 10).toBeTruthy();
});
