import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-38] Стабильность smoke-сценария (3 прогона)', async ({ page }) => {
  qase.id(41);
  const consoleErrors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(300); // короткая стабилизация
  expect(consoleErrors, `Console errors: ${consoleErrors.join('\n')}`).toHaveLength(0);
});
