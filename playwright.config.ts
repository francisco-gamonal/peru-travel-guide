import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const port = 4321;

function loadLocalEnv() {
	const path = resolve(process.cwd(), '.env');
	if (!existsSync(path)) {
		return;
	}
	for (const line of readFileSync(path, 'utf8').split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) {
			continue;
		}
		const eq = trimmed.indexOf('=');
		if (eq === -1) {
			continue;
		}
		const key = trimmed.slice(0, eq).trim();
		const value = trimmed.slice(eq + 1).trim();
		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

loadLocalEnv();

const basePath = process.env.ASTRO_BASE ?? '/peru-travel-guide/';
const baseURL = `http://127.0.0.1:${port}${basePath.replace(/\/?$/, '/')}`;

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
