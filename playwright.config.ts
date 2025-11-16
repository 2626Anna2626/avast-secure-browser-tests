import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        configFile: 'qase.config.json',
        // режим, при котором результаты шлются в Qase
        mode: 'testops'
      }
    ]
  ],

  projects: [
    // ------------------------------
    // Desktop project: Avast Browser
    // ------------------------------
    {
      name: 'Avast Secure Browser',
      use: {
        executablePath:
          '/Applications/Avast Secure Browser.app/Contents/MacOS/Avast Secure Browser',
        viewport: { width: 1280, height: 800 },
      },
    },

    // ------------------------------
    // Mobile project: iPhone 13
    // ------------------------------
    {
      name: 'iPhone 13',
      use: {
        ...devices['iPhone 13'],
        screenshot: 'on',
        video: 'on',
        trace: 'on',
      },
    },
  ],
});
