import { test, expect } from '@playwright/test';
import { qase } from 'playwright-qase-reporter';
import { closeCookies } from '../helpers/cookies';

test('[ASB-45] A11y: key images have alt', async ({ page }) => {
  qase.id(48);
  await page.goto('https://www.avast.com');
  await closeCookies(page);

  const imgs = await page.$$eval('img', arr =>
    arr.map(i => ({ src: (i as HTMLImageElement).src, alt: (i as HTMLImageElement).alt }))
  );
  const empties = imgs.filter(i => !i.alt?.trim());

  expect(empties.length).toBeLessThanOrEqual(3);
});
