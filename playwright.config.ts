import { defineConfig, devices } from '@playwright/test';

const port = 4321;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',
	use: {
		...devices['Desktop Chrome'],
		baseURL,
	},
	webServer: {
		command: `pnpm run preview:e2e`,
		url: baseURL,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
