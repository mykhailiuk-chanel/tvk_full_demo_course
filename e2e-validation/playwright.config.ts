import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const MINUTE = 60 * 1000;
const htmlReportPath = path.join(__dirname, `./tvk-html-report`);

console.log(process.env.CI ? `>> This is CI job` : `>> This is not CI job`);

const { BACKEND_HOST, BACKEND_PORT } = process.env;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e/specs',
  testMatch: './e2e/**/*.spec.ts',
  timeout: 1 * MINUTE,  
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [`list`, { printSteps: false }],
    ['html', { open: 'never', outputFolder: htmlReportPath }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-web-security'
          ],
        },
        viewport: { width: 1920, height: 1080 },
      },
    },
    //TODO: need updates - only for api-tests
    {
      name: 'backand-tests', 
      use: {
        ...devices['Desktop Chrome'],
        // baseURL: 'http://127.0.0.1:3053',
        baseURL: `${BACKEND_HOST}:${BACKEND_PORT}`,
      },
      testMatch: '/server-tests/*.spec.ts',
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
