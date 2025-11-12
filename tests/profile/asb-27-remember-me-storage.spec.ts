import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import path from 'path';

test('[ASB-27] Персистентность входа через storageState (без внешних сервисов)', async ({ browser }, testInfo) => {
  qase.id(30);

  const statePath = path.join(testInfo.outputDir, 'state.json');

  // 1) "Первый запуск": создаём контекст и ставим cookie вручную для домена example.com
  const ctx1 = await browser.newContext();
  // cookie будет видна на https://example.com
  await ctx1.addCookies([{
    name: 'remember_me',
    value: '1',
    domain: 'example.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax'
  }]);

  const p1 = await ctx1.newPage();
  await p1.goto('https://example.com', { waitUntil: 'domcontentloaded' });

  // Проверяем, что cookie присутствует в первом запуске
  const cookies1 = await ctx1.cookies('https://example.com');
  const hasRemember1 = cookies1.some(c => c.name === 'remember_me' && c.value === '1');
  expect(hasRemember1).toBeTruthy();

  // 2) Сохраняем состояние и закрываем контекст
  await ctx1.storageState({ path: statePath });
  await ctx1.close();

  // 3) "Второй запуск": создаём новый контекст с тем же storageState
  const ctx2 = await browser.newContext({ storageState: statePath });
  const p2 = await ctx2.newPage();
  await p2.goto('https://example.com', { waitUntil: 'domcontentloaded' });

  // Cookie должна подтянуться из state.json
  const cookies2 = await ctx2.cookies('https://example.com');
  const hasRemember2 = cookies2.some(c => c.name === 'remember_me' && c.value === '1');
  expect(hasRemember2).toBeTruthy();

  await ctx2.close();
});
