import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import AxeBuilder from '@axe-core/playwright';

test('[ASB-42] A11y: serious/critical – только известные нарушения', async ({ page }) => {
  qase.id(45);

  await page.goto('https://www.avast.com', { waitUntil: 'domcontentloaded' });

  const results = await new AxeBuilder({ page }).analyze();

  const bad = results.violations.filter(v =>
    ['serious', 'critical'].includes(v.impact ?? '')
  );

  // Базовый список известных нарушений, заведённых в баг-репорты
  const knownIds = ['aria-allowed-attr', 'aria-dialog-name', 'image-alt'];

  const unexpected = bad.filter(v => !knownIds.includes(v.id));

  console.log('A11y serious/critical found:', bad.map(v => v.id));

  // Тест падает только если появились новые serious/critical, помимо известных трёх
  expect(unexpected.map(v => v.id)).toEqual([]);
});

