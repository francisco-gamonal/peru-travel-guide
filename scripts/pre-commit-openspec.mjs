#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listActiveChanges } from './openspec-active-changes.mjs';

async function main() {
	const active = await listActiveChanges();

	if (active.length === 0) {
		return;
	}

	for (const name of active) {
		console.log(`openspec validate ${name}…`);
		const result = spawnSync('openspec', ['validate', name], {
			stdio: 'inherit',
			cwd: process.cwd(),
		});
		if (result.status !== 0) {
			process.exit(result.status ?? 1);
		}
	}
}

const isCli =
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) {
	main().catch((err) => {
		console.error(err);
		process.exit(1);
	});
}
