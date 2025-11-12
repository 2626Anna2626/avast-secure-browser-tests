import { test } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test.skip('[ASB-2] Открытие страницы настроек Avast Secure Browser (ручной тест)', async () => {
  qase.id(5); // кейс ASB-5
  // Выполняется вручную, Playwright не открывает avast://settings
});
