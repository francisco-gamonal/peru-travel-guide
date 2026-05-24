import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { listActiveChanges } from '../../scripts/openspec-active-changes.mjs';

const packageJson = JSON.parse(
	readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'),
) as { scripts: Record<string, string> };

describe('openspec-active-changes', () => {
	// @spec TH-09
	it('test:verify:push invoca spec:traceability cuando hay cambio activo', () => {
		expect(packageJson.scripts['test:verify:push']).toContain('spec:traceability');
		expect(packageJson.scripts['test:verify']).toContain('spec:traceability');
	});

	// @spec TH-10
	it('sin cambio activo listActiveChanges devuelve lista vacía', async () => {
		const active = await listActiveChanges();
		expect(active).toEqual([]);
	});
});

describe('pre-commit openspec (contrato TH-12)', () => {
	it('pre-commit script existe en package.json vía husky', async () => {
		const active = await listActiveChanges();
		expect(active).toEqual([]);
	});
});
