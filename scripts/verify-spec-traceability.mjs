#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listActiveChanges } from './openspec-active-changes.mjs';

const ROOT = process.cwd();
const TRACEABILITY_HEADING = /^## Test traceability\s*$/m;

/**
 * @param {string} designContent
 * @returns {number}
 */
export function findTraceabilitySectionStart(designContent) {
	const match = TRACEABILITY_HEADING.exec(designContent);
	return match?.index ?? -1;
}

/**
 * @param {string} designContent
 * @returns {{ specId: string; file: string }[]}
 */
export function parseTraceabilityTable(designContent) {
	const start = findTraceabilitySectionStart(designContent);
	if (start === -1) {
		return [];
	}
	const section = designContent.slice(start);
	const header = '## Test traceability';
	const lines = section.split('\n');
	const rows = [];
	let inTable = false;

	for (const line of lines) {
		if (line.startsWith('## ') && line.trim() !== header) {
			break;
		}
		if (line.startsWith('| Spec ID |')) {
			inTable = true;
			continue;
		}
		if (!inTable) {
			continue;
		}
		if (!line.startsWith('|')) {
			break;
		}
		if (line.includes('---')) {
			continue;
		}
		const cells = line
			.split('|')
			.map((c) => c.trim())
			.filter(Boolean);
		if (cells.length < 3) {
			continue;
		}
		const specId = cells[0];
		const fileCell = cells[2].replace(/`/g, '').trim();
		if (!/^[A-Z]{2,4}-\d{2}$/.test(specId)) {
			continue;
		}
		rows.push({ specId, file: fileCell });
	}
	return rows;
}

/**
 * @param {string} fileContent
 * @param {string} specId
 */
export function hasSpecComment(fileContent, specId) {
	return fileContent.includes(`// @spec ${specId}`);
}

async function main() {
	const active = await listActiveChanges();

	if (active.length === 0) {
		console.log('spec:traceability — sin cambios OpenSpec activos; omitido.');
		return;
	}

	if (active.length > 1) {
		console.error(
			`spec:traceability — hay ${active.length} cambios activos; deja solo uno:\n${active.map((n) => `  - ${n}`).join('\n')}`,
		);
		process.exit(1);
	}

	const changeName = active[0];
	const designPath = join(ROOT, 'openspec/changes', changeName, 'design.md');
	let designContent;
	try {
		designContent = await readFile(designPath, 'utf8');
	} catch {
		console.error(`spec:traceability — falta ${designPath}`);
		process.exit(1);
	}

	const rows = parseTraceabilityTable(designContent);
	if (rows.length === 0) {
		console.error(
			`spec:traceability — no hay tabla ## Test traceability en design.md de ${changeName}`,
		);
		process.exit(1);
	}

	const missing = [];
	for (const { specId, file } of rows) {
		const filePath = join(ROOT, file);
		let content;
		try {
			content = await readFile(filePath, 'utf8');
		} catch {
			missing.push({ specId, file, reason: 'archivo no encontrado' });
			continue;
		}
		if (!hasSpecComment(content, specId)) {
			missing.push({ specId, file, reason: 'falta // @spec' });
		}
	}

	if (missing.length > 0) {
		console.error(`spec:traceability — enlaces incompletos en ${changeName}:`);
		for (const m of missing) {
			console.error(`  - ${m.specId} → ${m.file} (${m.reason})`);
		}
		process.exit(1);
	}

	console.log(
		`spec:traceability — OK (${rows.length} IDs) para cambio ${changeName}`,
	);
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
