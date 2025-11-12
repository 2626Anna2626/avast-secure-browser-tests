import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';

test('[ASB-28] Приватный контекст изолирован (без сохранённого состояния)', async ({ browser }) => {
  qase.id(31);

  // 1) Обычный контекст: ставим cookie для example.com
  const ctx1 = await browser.newContext();
  await ctx1.addCookies([{
    name: 'remember_me',
    value: '1',
    domain: 'example.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax'
  }]);
  await ctx1.close(); // storageState намеренно не сохраняем

  // 2) Новый "приватный" контекст без storageState
  const privateCtx = await browser.newContext();
  const p2 = await privateCtx.newPage();
  await p2.goto('https://example.com', { waitUntil: 'domcontentloaded' });

  const cookies = await privateCtx.cookies('https://example.com');
  const hasRemember = cookies.some(c => c.name === 'remember_me');
  expect(hasRemember).toBeFalsy();

  await privateCtx.close();
});
