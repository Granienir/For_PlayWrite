// @ts-check
const { defineConfig, devices } = require("@playwright/test");

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require("dotenv").config(/*{ path: path.resolve(__dirname, ".env") }*/);

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: "./tests",
  testMatch: "**.spec.js",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    headless: true,
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.USER_NAME,
      password: process.env.USER_PASS,
    },
    globalSetup: "global-setup.ts",
  },

  /* Configure projects for major browsers */
  //
  projects: [
    {
      name: "login",
      testDir: "./tests/setup",
      testMatch: "login.setup.js",
    },
    {
      name: "qauto",
      testDir: "./tests/storage",
      testMatch: "**.spec.js",
      use: {
        storageState: "session-storage.json",
      },
      dependencies: ["login"],
    },
    {
      name: "fixtures",
      testDir: "./tests/fixture",
      testMatch: "fixtures.spec.js",
      dependencies: ["login"],
    },
    {
      name: "api",
      testDir: "./tests/api",
      testMatch: "api.spec.js",
      dependencies: ["login"],
    },
    // {
    //   name: "all_other",
    //   testDir: "./tests",
    //   testMatch: "**.spec.js",
    // },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
