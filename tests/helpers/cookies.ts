import { Page } from '@playwright/test';

// Универсальная функция для закрытия cookie-баннера на разных языках
export async function closeCookies(page: Page) {
  const selectors = [
    'text=Accept all',
    'text=I agree',
    'text=Souhlasím',
    'text=Zamítnout vše',
    'text=Přijmout vše',
    'text=Got it',
  ];

  for (const sel of selectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible()) {
        await btn.click();
        break;
      }
    } catch {
      // Если элемент не найден — просто идём дальше
    }
  }
}
