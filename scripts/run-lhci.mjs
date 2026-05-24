#!/usr/bin/env node
/**
 * Ejecuta `lhci autorun` con CHROME_PATH apuntando a Chromium de Playwright (Linux en WSL).
 * Evita que Lighthouse use Chrome de Windows (/mnt/c/...), que falla con ECONNREFUSED en WSL2.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

/**
 * @returns {string | null}
 */
export function resolveChromePath() {
	if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) {
		return process.env.CHROME_PATH;
	}
	try {
		const playwrightPath = chromium.executablePath();
		if (playwrightPath && existsSync(playwrightPath)) {
			return playwrightPath;
		}
	} catch {
		// Playwright sin browsers instalados
	}
	return null;
}

function main() {
	const chromePath = resolveChromePath();
	const env = { ...process.env };

	if (chromePath) {
		env.CHROME_PATH = chromePath;
		console.log(`LHCI: CHROME_PATH=${chromePath}`);
	} else {
		console.error(
			'LHCI: no se encontró Chromium. Ejecuta: pnpm exec playwright install chromium',
		);
		process.exit(1);
	}

	const result = spawnSync('lhci', ['autorun'], {
		stdio: 'inherit',
		env,
	});

	process.exit(result.status ?? 1);
}

const isCli =
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
	main();
}
