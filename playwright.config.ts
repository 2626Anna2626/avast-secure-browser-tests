import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Avast Secure Browser',
      use: {
        executablePath: '/Applications/Avast Secure Browser.app/Contents/MacOS/Avast Secure Browser',
        viewport: { width: 1280, height: 800 },
      },
    },
  ],
});
