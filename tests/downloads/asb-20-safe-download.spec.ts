import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import fs from 'fs';

test('[ASB-20] Скачивание безопасного файла (hello.txt)', async ({ page }, testInfo) => {
  qase.id(23);

  // Делаем минимальную страничку со ссылкой "download" (надёжно и быстро)
  const dataHref = 'data:text/plain,Hello%20Avast%20Secure%20Browser';
  await page.setContent(`<a id="d" href="${dataHref}" download="hello.txt">Download</a>`);

  const downloadPromise = page.waitForEvent('download');
  await page.click('#d');

  const download = await downloadPromise;
  const savePath = testInfo.outputPath('hello.txt');
  await download.saveAs(savePath);

  const stat = fs.statSync(savePath);
  expect(stat.size).toBeGreaterThan(0);
});
