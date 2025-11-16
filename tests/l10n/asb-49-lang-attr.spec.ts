import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-49] L10n: html lang matches locale', async ({ page }) => {
  qase.id(52);
  await page.goto('https://www.avast.com/cs-cz/');

  const lang = await page.getAttribute('html', 'lang');
  expect(lang?.toLowerCase()).toContain('cs');
});
