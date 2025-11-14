/*
import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import AxeBuilder from '@axe-core/playwright';

test('[ASB-42] A11y: serious/critical = 0', async ({ page }) => {
  qase.id(45);
  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  const results = await new AxeBuilder({ page }).analyze();
  const bad = results.violations.filter(v => ['serious','critical'].includes(v.impact ?? ''));
  expect(bad.map(b => b.id)).toEqual([]);
});
*/
