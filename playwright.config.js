// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',    // Directory containing test files
  timeout: 30 * 1000,    // Timeout for each test (30 seconds)
  expect: {
    timeout: 5000       // Timeout for expect assertions (5 seconds)
  },
  fullyParallel: true,  // Run tests in parallel
  retries: 2,          // Retry failed tests 2 times
  workers: 1,          // Number of worker processes (set to 1 for debugging)
  reporter: 'html',    // Generate HTML reports

  // Configure browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to add more browsers
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  // Global settings for all tests
  use: {
    baseURL: 'https://demo.nopcommerce.com',
    headless: false,    // Show browser while running tests
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
