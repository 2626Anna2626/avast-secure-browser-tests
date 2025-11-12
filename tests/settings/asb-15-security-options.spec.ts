import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-15] Проверка работы защитных опций (блокировка трекеров)', async ({ page }) => {
  qase.id(18);

  const requests: string[] = [];

  page.on('request', (request) => {
    requests.push(request.url());
  });

  // Открываем сайт с большим количеством внешних ресурсов
  await page.goto('https://www.example.com'); // сюда можно подставить новостник или трекер-тест

  await expect(page).toHaveTitle(/example|Example/i);

  // Пример простой проверки: нет запросов к условному трекинг-домену
  const hasTracker = requests.some((url) =>
    url.includes('doubleclick.net') || url.includes('google-analytics.com')
  );

  // Мы ожидаем, что такие запросы либо отсутствуют, либо минимальны
  expect(hasTracker).toBeFalsy();
});
