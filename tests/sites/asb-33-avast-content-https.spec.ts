import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-33] avast.com по HTTPS, контент загружается без 4xx/5xx', async ({ page }) => {
  qase.id(36);

  const badResponses: Array<{url:string;status:number}> = [];
  page.on('response', (res) => {
    const s = res.status();
    if (s >= 400) badResponses.push({ url: res.url(), status: s });
  });

  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });
  await closeCookies(page);

  expect(page.url().startsWith('https://')).toBeTruthy();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('button').first()).toBeVisible();

  expect(badResponses, `Есть неуспешные ответы: ${JSON.stringify(badResponses.slice(0,3))} ...`).toHaveLength(0);
});
