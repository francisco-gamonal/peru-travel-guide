import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
	hasSpecComment,
	parseTraceabilityTable,
	findTraceabilitySectionStart,
} from '../../scripts/verify-spec-traceability.mjs';
import { listActiveChanges } from '../../scripts/openspec-active-changes.mjs';

const SAMPLE_DESIGN = `
## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| SG-17 | unit | \`src/test/example-a.test.ts\` |
| SG-18 | unit | \`src/test/example-b.test.ts\` |
`;

const DESIGN_WITH_INLINE_MENTION = `
Lee la tabla \`## Test traceability\` del cambio activo.

## Test traceability

| Spec ID | Tipo | Archivo |
|---------|------|---------|
| SG-17 | unit | \`src/test/example-a.test.ts\` |
`;

describe('parseTraceabilityTable', () => {
	it('ignora menciones inline de ## Test traceability en el cuerpo', () => {
		expect(findTraceabilitySectionStart(DESIGN_WITH_INLINE_MENTION)).toBeGreaterThan(
			0,
		);
		const rows = parseTraceabilityTable(DESIGN_WITH_INLINE_MENTION);
		expect(rows).toHaveLength(1);
		expect(rows[0].specId).toBe('SG-17');
	});

	// @spec SG-17
	it('extrae Spec ID y archivo de la tabla en design.md', () => {
		const rows = parseTraceabilityTable(SAMPLE_DESIGN);
		expect(rows).toEqual([
			{ specId: 'SG-17', file: 'src/test/example-a.test.ts' },
			{ specId: 'SG-18', file: 'src/test/example-b.test.ts' },
		]);
	});

	// @spec SG-18
	it('detecta comentario // @spec en contenido de test', () => {
		const withLink = '// @spec SG-18\nit("x", () => {});';
		const without = 'it("x", () => {});';
		expect(hasSpecComment(withLink, 'SG-18')).toBe(true);
		expect(hasSpecComment(without, 'SG-18')).toBe(false);
	});
});

describe('listActiveChanges (post-archive)', () => {
	it('no lista archive como cambio activo', async () => {
		const active = await listActiveChanges();
		expect(active).not.toContain('archive');
	});
});
