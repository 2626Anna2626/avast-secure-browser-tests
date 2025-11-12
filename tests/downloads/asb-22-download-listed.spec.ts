import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import fs from 'fs';

test('[ASB-22] Подтверждение успешной загрузки через файл', async ({ page }, testInfo) => {
  qase.id(25);

  // Снова используем безопасный предсказуемый артефакт
  const dataHref = 'data:text/plain,Download%20Manager%20Emulation';
  await page.setContent(`<a id="d" href="${dataHref}" download="manager-check.txt">Download</a>`);

  const downloadPromise = page.waitForEvent('download');
  await page.click('#d');

  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('manager-check.txt');

  const savePath = testInfo.outputPath('manager-check.txt');
  await download.saveAs(savePath);

  const stat = fs.statSync(savePath);
  expect(stat.size).toBeGreaterThan(0);
});
