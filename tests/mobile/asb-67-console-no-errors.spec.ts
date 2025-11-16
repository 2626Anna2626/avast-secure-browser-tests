import { test, expect, devices } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test.use(devices['iPhone 13']);

test('[ASB-67] Mobile: no console errors', async ({ page }) => {
  qase.id(70);
  const errs: string[] = [];

  page.on('console', m => {
    if (m.type() === 'error') errs.push(m.text());
  });

  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  await closeCookies(page);
  await page.waitForTimeout(300);

  expect(errs, errs.join('\n')).toHaveLength(0);
});
