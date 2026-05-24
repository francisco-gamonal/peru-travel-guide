import { describe, expect, it } from 'vitest';
import {
	countUncheckedChecklistItems,
	findReviewChecklistSectionStart,
	parseReviewStatus,
	validateReviewGate,
} from '../../scripts/verify-review-gate.mjs';

const APPROVED_YAML = `schema: spec-driven
breaking: false
reviewStatus: approved
`;

const PENDING_YAML = `schema: spec-driven
reviewStatus: pending-review
`;

const DESIGN_APPROVED = `
## Review checklist

- [x] Alineado con mission
- [x] Aprobado para implementar
`;

const DESIGN_PENDING = `
## Review checklist

- [x] Alineado con mission
- [ ] Aprobado para implementar
`;

describe('parseReviewStatus', () => {
	// @spec SG-20
	it('lee reviewStatus desde .openspec.yaml', () => {
		expect(parseReviewStatus(PENDING_YAML)).toBe('pending-review');
		expect(parseReviewStatus(APPROVED_YAML)).toBe('approved');
		expect(parseReviewStatus('schema: spec-driven\n')).toBeNull();
	});
});

describe('countUncheckedChecklistItems', () => {
	it('cuenta items sin marcar en Review checklist', () => {
		expect(countUncheckedChecklistItems(DESIGN_PENDING)).toBe(1);
		expect(countUncheckedChecklistItems(DESIGN_APPROVED)).toBe(0);
	});

	it('encuentra la sección Review checklist como encabezado', () => {
		expect(findReviewChecklistSectionStart(DESIGN_APPROVED)).toBeGreaterThan(0);
	});
});

describe('validateReviewGate', () => {
	// @spec SG-21
	it('aprueba cuando reviewStatus approved y checklist completa', () => {
		expect(
			validateReviewGate({
				hasDesign: true,
				reviewStatus: 'approved',
				designContent: DESIGN_APPROVED,
			}),
		).toEqual({ ok: true });
	});

	// @spec TH-11
	it('spec:review-gate pasa con design aprobado', () => {
		const result = validateReviewGate({
			hasDesign: true,
			reviewStatus: parseReviewStatus(APPROVED_YAML),
			designContent: DESIGN_APPROVED,
		});
		expect(result.ok).toBe(true);
	});

	// @spec TH-12
	it('spec:review-gate falla si pending-review', () => {
		const result = validateReviewGate({
			hasDesign: true,
			reviewStatus: parseReviewStatus(PENDING_YAML),
			designContent: DESIGN_APPROVED,
		});
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.reason).toContain('pending-review');
		}
	});

	it('falla si checklist tiene items sin marcar', () => {
		const result = validateReviewGate({
			hasDesign: true,
			reviewStatus: 'approved',
			designContent: DESIGN_PENDING,
		});
		expect(result.ok).toBe(false);
	});

	// @spec SG-22
	it('apply bloqueado: gate rechaza pending-review aunque checklist esté completa', () => {
		const result = validateReviewGate({
			hasDesign: true,
			reviewStatus: 'pending-review',
			designContent: DESIGN_APPROVED,
		});
		expect(result.ok).toBe(false);
	});

	it('omite si no hay design.md', () => {
		expect(
			validateReviewGate({
				hasDesign: false,
				reviewStatus: null,
				designContent: '',
			}),
		).toEqual({ ok: true, skip: true });
	});
});
