#!/usr/bin/env node
// Compila CHANGELOG.md desde proposal.md en openspec/changes/archive/
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const ARCHIVE_DIR = join(ROOT, 'openspec/changes/archive');
const OUT_FILE = join(ROOT, 'CHANGELOG.md');

function parseArchiveFolder(name) {
	const match = /^(\d{4}-\d{2}-\d{2})-(.+)$/.exec(name);
	if (!match) return null;
	return { date: match[1], changeName: match[2], folder: name };
}

function extractWhatChanges(content) {
	const header = '## What Changes';
	const start = content.indexOf(header);
	if (start === -1) return null;
	const afterHeader = content.slice(start + header.length);
	const nextSection = afterHeader.search(/\n## /);
	const body = (nextSection === -1 ? afterHeader : afterHeader.slice(0, nextSection)).trim();
	return body || null;
}

async function main() {
	let entries;
	try {
		entries = await readdir(ARCHIVE_DIR, { withFileTypes: true });
	} catch (err) {
		if (err.code === 'ENOENT') {
			console.error(`No existe ${ARCHIVE_DIR}`);
			process.exit(1);
		}
		throw err;
	}

	const folders = entries
		.filter((e) => e.isDirectory())
		.map((e) => parseArchiveFolder(e.name))
		.filter(Boolean);

	if (folders.length === 0) {
		console.error('No hay carpetas archivadas en openspec/changes/archive/');
		process.exit(1);
	}

	const items = [];

	for (const { date, changeName, folder } of folders) {
		const proposalPath = join(ARCHIVE_DIR, folder, 'proposal.md');
		let content;
		try {
			content = await readFile(proposalPath, 'utf8');
		} catch {
			console.warn(`Omitido (sin proposal.md): ${folder}`);
			continue;
		}

		const whatChanges = extractWhatChanges(content);
		if (!whatChanges) {
			console.warn(`Omitido (sin ## What Changes): ${folder}`);
			continue;
		}

		items.push({ date, changeName, whatChanges });
	}

	if (items.length === 0) {
		console.error('Ningún proposal.md válido encontrado en archive/');
		process.exit(1);
	}

	items.sort((a, b) => b.date.localeCompare(a.date) || b.changeName.localeCompare(a.changeName));

	const lines = [
		'# Changelog',
		'',
		'> Generado con `pnpm changelog:generate` desde `openspec/changes/archive/*/proposal.md`.',
		'',
	];

	for (const { date, changeName, whatChanges } of items) {
		lines.push(`## ${date} — ${changeName}`, '', whatChanges, '', '---', '');
	}

	await writeFile(OUT_FILE, lines.join('\n').trimEnd() + '\n', 'utf8');
	console.log(`CHANGELOG.md generado con ${items.length} entradas.`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
