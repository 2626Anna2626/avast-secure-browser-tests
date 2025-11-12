import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-21] Блокировка потенциально опасной загрузки (браузер/провайдер)', async ({ page }) => {
  qase.id(24);

  // http → меньше сюрпризов с сертификатами на демо-хосте
  const url = 'http://testsafebrowsing.appspot.com/s/malware.html';
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // 1) Если провайдер перехватил страницу (как на твоём скрине O2),
  //   ссылки на "download" может не быть вовсе. Сначала проверим это.
  const providerBlock = page.locator(
    'text=/Nebezpečná stránka|Zablokovali jsme|Blocked|Bezpečnostní služba|O2/i'
  );
  const providerBlockedVisible = await providerBlock.isVisible().catch(() => false);

  // 2) Если страница не перехвачена провайдером, пытаемся найти download-ссылку на демо.
  const downloadLink = page.getByRole('link', { name: /download/i }).first();
  const hasDownloadLink = await downloadLink.isVisible().catch(() => false);

  // 3) В любом случае проверяем, что download-события НЕ произошло
  //    (на провайдерской шторке его быть не должно; на браузерной — тоже)
  const downloadEvent = page.waitForEvent('download', { timeout: 2000 }).catch(() => null);

  if (hasDownloadLink) {
    await downloadLink.click({ trial: false }).catch(() => {}); // если браузер/страница блокируют клик — ок
  }

  const download = await downloadEvent;

  // 4) Пытаемся распознать ЕЩЁ и браузерную интерстицу (если не провайдер)
  const browserWarning = page.locator(
    'text=/Deceptive|Malware|Útočná|Nebezpečná|Вредонос|Фишинг|Phishing/i'
  );
  const browserWarningVisible = await browserWarning.isVisible().catch(() => false);

  // Успех: либо провайдер заблокировал и нет download, либо браузер показал предупреждение и нет download
  expect(download).toBeNull();
  expect(providerBlockedVisible || browserWarningVisible).toBeTruthy();
});
