import { test, expect, devices } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test.use(devices['iPhone 13']);

test('[ASB-66] Mobile: viewport meta present', async ({ page }) => {
  qase.id(69);
  await page.goto('https://www.avast.com');
  await closeCookies(page);

  const content = await page.locator('meta[name="viewport"]').getAttribute('content');
  expect((content ?? '').toLowerCase()).toContain('width=device-width');
});
