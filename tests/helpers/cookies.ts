import { Page } from '@playwright/test';

export async function closeCookies(page: Page) {
  const selectors = [
    // Чешский баннер
    'text=OK',
    'text=Odmítnout vše',
    'text=Spravovat',

    // Дополнительные языки
    'text=Accept all',
    'text=I agree',
    'text=Got it',
    'text=Souhlasím',
    'text=Přijmout vše'
  ];

  for (const sel of selectors) {
    const btn = page.locator(sel).first();
    try {
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 2000 });
        return; 
      }
    } catch {
      // просто пробуем следующий селектор
    }
  }
}

