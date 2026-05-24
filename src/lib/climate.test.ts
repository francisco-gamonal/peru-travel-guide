import { describe, expect, it } from 'vitest';
import {
	buildClimateWidgetView,
	formatMonthRange,
	getClimateByDestinationId,
	loadClimateData,
} from './climate';

describe('loadClimateData', () => {
	it('carga clima para los destinos curados', () => {
		const data = loadClimateData();
		expect(data.destinations).toHaveLength(4);
		expect(data.destinations.map((d) => d.destinationId)).toEqual([
			'madrid',
			'cdmx',
			'buenos-aires',
			'london',
		]);
	});

});

describe('getClimateByDestinationId', () => {
	const data = loadClimateData();

	it('resuelve madrid con resumen continental', () => {
		const madrid = getClimateByDestinationId(data, 'madrid');
		expect(madrid?.summary).toMatch(/continental/i);
		expect(madrid?.bestTimeToVisit.length).toBeGreaterThanOrEqual(1);
	});

	it('resuelve cdmx con temporada de lluvias', () => {
		const cdmx = getClimateByDestinationId(data, 'cdmx');
		expect(cdmx?.summary).toMatch(/temporada de lluvias/i);
	});

	it('devuelve null para id inválido', () => {
		expect(getClimateByDestinationId(data, 'no-existe')).toBeNull();
		expect(getClimateByDestinationId(data, null)).toBeNull();
	});
});

describe('buildClimateWidgetView', () => {
	const data = loadClimateData();

	it('expone resumen, estaciones y mejores épocas para Madrid', () => {
		const madrid = getClimateByDestinationId(data, 'madrid');
		expect(madrid).not.toBeNull();
		const view = buildClimateWidgetView(madrid!);
		expect(view.summary).toMatch(/continental/i);
		expect(view.seasons.length).toBeGreaterThanOrEqual(2);
		expect(view.seasons[0]).toMatchObject({
			name: expect.any(String),
			tempRangeC: expect.any(String),
			rainfall: expect.any(String),
			description: expect.any(String),
		});
		expect(view.bestTimes.length).toBeGreaterThanOrEqual(1);
		expect(view.bestTimes[0]!.monthsFormatted).toMatch(/Abr/);
	});

	it('agrupa fuente en sourceFooter', () => {
		const cdmx = getClimateByDestinationId(data, 'cdmx');
		const view = buildClimateWidgetView(cdmx!);
		expect(view.sourceFooter.source).toBeTruthy();
		expect(view.sourceFooter.year).toBeGreaterThan(2000);
		expect(view.sourceFooter.sourceUrl).toMatch(/^https?:/);
	});
});

describe('formatMonthRange', () => {
	it('formatea un solo mes', () => {
		expect(formatMonthRange(['Jul'])).toBe('Jul');
	});

	it('formatea rango de meses', () => {
		expect(formatMonthRange(['Abr', 'May', 'Jun'])).toBe('Abr a Jun');
	});

	it('devuelve vacío sin meses', () => {
		expect(formatMonthRange([])).toBe('');
	});
});
