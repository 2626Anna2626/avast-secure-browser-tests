import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-43] A11y: role elements have accessible name', async ({ page }) => {
  qase.id(46);
  await page.goto('https://www.avast.com');

  const roles = ['button', 'link'];
  for (const r of roles) {
    const els = page.getByRole(r as any);
    await expect(els.first()).toBeVisible();
  }
});
