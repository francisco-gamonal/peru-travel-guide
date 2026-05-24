// @ts-check
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repoBase = '/peru-travel-guide/';
const defaultSite = 'https://github.com';

/** Carga `.env` en process.env (sin sobrescribir variables ya definidas, p. ej. CI). */
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
		let value = trimmed.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		if (process.env[key] === undefined) {
			process.env[key] = value;
		}
	}
}

loadLocalEnv();

// https://astro.build/config
export default defineConfig({
	site: process.env.ASTRO_SITE ?? defaultSite,
	base: process.env.ASTRO_BASE ?? repoBase,
	vite: {
		plugins: [tailwindcss()],
	},
});
