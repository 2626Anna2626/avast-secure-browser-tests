// tests/security/asb-19-bad-certificate.spec.ts
import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-19] Блокировка при невалидном сертификате', async ({ page }) => {
  qase.id(22);

  const url = 'https://self-signed.badssl.com/';
  let certErrorCaught = false;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  } catch (e: any) {
    certErrorCaught = /ERR_CERT|SSL|certificate/i.test(String(e?.message ?? ''));
  }

  // Если исключения нет, пробуем распознать интерстициальную страницу
  const interstitial = page.locator(
    'text=/Your connection is not private|NET::ERR_CERT|Не защищено|Vaše připojení není soukromé/i'
  );
  const interstitialVisible = await interstitial.isVisible().catch(() => false);

  // Успех теста — если либо поймали cert-ошибку, либо видим блокирующее предупреждение
  expect(certErrorCaught || interstitialVisible).toBeTruthy();
});

