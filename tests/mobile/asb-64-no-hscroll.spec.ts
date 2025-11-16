import { test, expect, devices } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test.use(devices['iPhone 13']);

test('[ASB-64] Mobile: no horizontal scroll overflow', async ({ page }) => {
  qase.id(67);
  await page.goto('https://www.avast.com');
  await closeCookies(page);

  const overflow = await page.evaluate(
    () => document.body.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
