import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-55] L10n: no major language mix', async ({ page }) => {
  qase.id(58);

  await page.goto('https://www.avast.com/cs-cz/', { waitUntil: 'domcontentloaded' });
  await closeCookies(page);

  // 🔹 Берём именно видимый текст, максимально близко к Cmd+F
  const text = (await page.innerText('body')).toLowerCase();

  // 🔹 Ищем “часто встречающиеся английские служебные слова”
  const matches = text.match(/\b(the|and|for|with|download)\b/g);
  const englishCount = matches?.length ?? 0;

  console.log('English words found:', englishCount);

  // Порог оставляем как в тест-плане, можно подстроить по факту
  expect(englishCount).toBeLessThan(30);
});

  