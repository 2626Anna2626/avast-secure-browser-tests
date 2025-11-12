import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-3] Главная avast.com корректно отображается в ASB', async ({ page }) => {
  qase.id(6); // кейс ASB-6

  await page.goto('https://avast.com');
  await closeCookies(page);

  await expect(page).toHaveTitle(/Avast/i);
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('button').first()).toBeVisible();
});
