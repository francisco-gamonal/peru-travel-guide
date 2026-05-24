#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listActiveChanges } from './openspec-active-changes.mjs';

const ROOT = process.cwd();
const CHECKLIST_HEADING = /^## Review checklist\s*$/m;

/**
 * @param {string} yamlContent
 * @returns {string | null}
 */
export function parseReviewStatus(yamlContent) {
	const match = yamlContent.match(/^reviewStatus:\s*(\S+)\s*$/m);
	return match?.[1] ?? null;
}

/**
 * @param {string} designContent
 * @returns {number}
 */
export function findReviewChecklistSectionStart(designContent) {
	const match = CHECKLIST_HEADING.exec(designContent);
	return match?.index ?? -1;
}

/**
 * @param {string} designContent
 * @returns {number}
 */
export function countUncheckedChecklistItems(designContent) {
	const start = findReviewChecklistSectionStart(designContent);
	if (start === -1) {
		return 0;
	}
	const section = designContent.slice(start);
	const lines = section.split('\n');
	let unchecked = 0;

	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.startsWith('## ') && trimmed !== '## Review checklist') {
			break;
		}
		if (/^- \[ \]/.test(trimmed)) {
			unchecked += 1;
		}
	}
	return unchecked;
}

/**
 * @param {{ hasDesign: boolean; reviewStatus: string | null; designContent: string }} input
 * @returns {{ ok: true; skip?: boolean } | { ok: false; reason: string }}
 */
export function validateReviewGate(input) {
	const { hasDesign, reviewStatus, designContent } = input;

	if (!hasDesign) {
		return { ok: true, skip: true };
	}

	if (reviewStatus !== 'approved') {
		return {
			ok: false,
			reason:
				reviewStatus === null
					? 'reviewStatus ausente en .openspec.yaml; debe ser approved antes de apply'
					: `reviewStatus es "${reviewStatus}"; debe ser approved antes de apply`,
		};
	}

	const unchecked = countUncheckedChecklistItems(designContent);
	if (unchecked > 0) {
		return {
			ok: false,
			reason: `${unchecked} item(s) sin marcar en ## Review checklist de design.md`,
		};
	}

	return { ok: true };
}

async function main() {
	const active = await listActiveChanges();

	if (active.length === 0) {
		console.log('spec:review-gate — sin cambios OpenSpec activos; omitido.');
		return;
	}

	if (active.length > 1) {
		console.error(
			`spec:review-gate — hay ${active.length} cambios activos; deja solo uno:\n${active.map((n) => `  - ${n}`).join('\n')}`,
		);
		process.exit(1);
	}

	const changeName = active[0];
	const changeDir = join(ROOT, 'openspec/changes', changeName);
	const designPath = join(changeDir, 'design.md');
	const openspecPath = join(changeDir, '.openspec.yaml');

	let hasDesign = true;
	let designContent = '';
	try {
		designContent = await readFile(designPath, 'utf8');
	} catch {
		hasDesign = false;
	}

	if (!hasDesign) {
		console.log(
			`spec:review-gate — sin design.md en ${changeName}; omitido.`,
		);
		return;
	}

	let yamlContent = '';
	try {
		yamlContent = await readFile(openspecPath, 'utf8');
	} catch {
		console.error(`spec:review-gate — falta ${openspecPath}`);
		process.exit(1);
	}

	const reviewStatus = parseReviewStatus(yamlContent);
	const result = validateReviewGate({ hasDesign, reviewStatus, designContent });

	if (!result.ok) {
		console.error(`spec:review-gate — bloqueado para ${changeName}: ${result.reason}`);
		console.error(
			'  Marca la checklist en design.md, confirma explícitamente y setea reviewStatus: approved en .openspec.yaml',
		);
		process.exit(1);
	}

	console.log(`spec:review-gate — OK para cambio ${changeName}`);
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
