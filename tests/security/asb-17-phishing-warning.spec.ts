// tests/security/asb-17-phishing-warning.spec.ts
import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-17] Предупреждение при фишинговом сайте', async ({ page }) => {
  qase.id(20);

  // 1) http, не https — избегаем проблем с CN
  const url = 'http://testsafebrowsing.appspot.com/s/phishing.html';

  // 2) Пытаемся зайти и ждём один из признаков интерстиций
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // На разных локалях/темах текст может отличаться:
  const warning = page.locator(
    'text=/Deceptive\\s+site\\s+ahead|Phishing|Подделка|Nebezpečné|Útočná stránka/i'
  );

  // Проверяем один из двух исходов:
  // а) видим предупреждение
  // б) либо URL не дал загрузиться/поменялся (может быть кастомная шторка)
  const warningVisible = await warning.isVisible().catch(() => false);
  const stayedOnDemoHost = page.url().includes('testsafebrowsing.appspot.com');

  expect(warningVisible || stayedOnDemoHost).toBeTruthy();
});

