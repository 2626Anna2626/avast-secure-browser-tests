import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-48] A11y: locale page serious/critical = 0', async ({ page }) => {
  qase.id(51);
  await page.goto('https://www.avast.com/cs-cz/');
  await closeCookies(page);

  const res = await new AxeBuilder({ page }).analyze();
  const bad = res.violations.filter(v =>
    ['serious', 'critical'].includes(v.impact ?? '')
  );

  expect(bad.map(b => b.id)).toEqual([]);
});
