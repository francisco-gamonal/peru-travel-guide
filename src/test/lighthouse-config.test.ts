import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import budget from '../../scripts/lighthouse-budget.cjs';

const SDD_THRESHOLDS = {
	lcpMs: 2500,
	cls: 0.1,
	inpMs: 200,
};

describe('lighthouse-budget (performance-budget)', () => {
	// @spec PB-01
	it('umbrales LCP y CLS alineados con specs/sdd-conventions.md', () => {
		expect(budget.THRESHOLDS.lcpMs).toBe(SDD_THRESHOLDS.lcpMs);
		expect(budget.THRESHOLDS.cls).toBe(SDD_THRESHOLDS.cls);
		expect(budget.THRESHOLDS.inpMs).toBe(SDD_THRESHOLDS.inpMs);
		expect(budget.ASTRO_BASE).toBe('/peru-travel-guide/');
		expect(budget.ROUTE_PATHS).toContain('destino/london/');
	});

	// @spec PB-02
	it('lighthouserc.cjs refleja los mismos umbrales que lighthouse-budget', () => {
		const configPath = resolve(process.cwd(), 'lighthouserc.cjs');
		const source = readFileSync(configPath, 'utf8');
		expect(source).toContain('lighthouse-budget.cjs');
		expect(source).toContain('THRESHOLDS.lcpMs');
		expect(source).toContain('THRESHOLDS.cls');
		const urls = budget.previewUrls();
		expect(urls.some((u) => u.includes('/peru-travel-guide/'))).toBe(true);
		expect(urls.some((u) => u.includes('/destino/london/'))).toBe(true);
	});

	// @spec PB-07
	it('INP manual documentado tras spike negativo (sin gate en lighthouserc)', () => {
		const configPath = resolve(process.cwd(), 'lighthouserc.cjs');
		const config = readFileSync(configPath, 'utf8');
		expect(config).not.toContain('interaction-to-next-paint');

		const sddPath = resolve(process.cwd(), 'specs/sdd-conventions.md');
		const sdd = readFileSync(sddPath, 'utf8');
		expect(sdd).toMatch(/INP.*manual/i);
		expect(sdd).toContain('enhance-performance-inp-ci');
		expect(sdd).toContain('PB-07');

		const specPath = resolve(
			process.cwd(),
			'openspec/specs/performance-budget/spec.md',
		);
		const spec = readFileSync(specPath, 'utf8');
		expect(spec).toContain('PB-07');
	});

	// @spec DV-06
	it('CI ejecuta LHCI post-build con assertions LCP/CLS', () => {
		const ciPath = resolve(process.cwd(), '.github/workflows/ci.yml');
		const ci = readFileSync(ciPath, 'utf8');
		expect(ci).toContain('lighthouse:');
		expect(ci).toContain('pnpm lhci');
		const configPath = resolve(process.cwd(), 'lighthouserc.cjs');
		const config = readFileSync(configPath, 'utf8');
		expect(config).toContain('largest-contentful-paint');
		expect(config).toContain('cumulative-layout-shift');
	});
});
