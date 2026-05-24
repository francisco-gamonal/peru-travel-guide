import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

const CHANGES_DIR = join(process.cwd(), 'openspec/changes');

/**
 * @returns {Promise<string[]>} Nombres de cambios activos (excluye `archive`).
 */
export async function listActiveChanges() {
	let entries;
	try {
		entries = await readdir(CHANGES_DIR, { withFileTypes: true });
	} catch (err) {
		if (/** @type {NodeJS.ErrnoException} */ (err).code === 'ENOENT') {
			return [];
		}
		throw err;
	}
	return entries
		.filter((e) => e.isDirectory() && e.name !== 'archive')
		.map((e) => e.name)
		.sort();
}
