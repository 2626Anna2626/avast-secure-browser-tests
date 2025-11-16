import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-50] L10n: CTA localized', async ({ page }) => {
  qase.id(53);

  await page.goto('https://www.avast.com/cs-cz/', {
    waitUntil: 'domcontentloaded',
  });

  // закрываем cookie баннер
  await closeCookies(page);

  // на cs-CZ CTA — это ссылка, а не button
  const cta = page.getByRole('link', { name: /stáhnout/i }).first();

  await expect(cta).toBeVisible({ timeout: 8000 });
});
