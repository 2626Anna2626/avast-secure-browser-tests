import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-39] Визуальная регрессия (скриншот)', async ({ page }) => {
  qase.id(42);

  await page.goto('https://www.avast.com', { waitUntil: 'networkidle' });
  await closeCookies(page);

  // стабильность
  await page.addStyleTag({ content: '*{animation:none!important;transition:none!important}' });
  await page.waitForTimeout(300);

  // при необходимости раскомментируй маски
  // const masked = [page.locator('video'), page.locator('iframe')];

  await expect(page).toHaveScreenshot('avast-home.png', {
    fullPage: true,
    // mask: masked,
    maxDiffPixelRatio: 0.02
  });
});

