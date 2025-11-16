import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-46] A11y: heading structure sane', async ({ page }) => {
  qase.id(49);
  await page.goto('https://www.avast.com');

  const hs = await page.$$eval('h1,h2,h3', els => els.map(e => e.tagName));
  expect(hs.filter(h => h === 'H1').length).toBeGreaterThanOrEqual(1);
});
