import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-34] Нет ошибок в консоли на avast.com', async ({ page }) => {
  qase.id(37);

  const consoleErrors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  await closeCookies(page);

  // Небольшое ожидание стабилизации js
  await page.waitForTimeout(500);

  expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toHaveLength(0);
});
