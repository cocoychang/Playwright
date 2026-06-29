// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './tests',
  retries :1,
  workers: 3,
  /* Maximum time one test can run for. */
  //10-
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',

  },
};
module.exports = config

