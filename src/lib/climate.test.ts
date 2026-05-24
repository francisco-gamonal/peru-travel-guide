import { describe, expect, it } from 'vitest';
import {
	formatMonthRange,
	getClimateByDestinationId,
	loadClimateData,
} from './climate';

describe('loadClimateData', () => {
	it('carga clima para los tres destinos curados', () => {
		const data = loadClimateData();
		expect(data.destinations).toHaveLength(3);
		expect(data.destinations.map((d) => d.destinationId)).toEqual([
			'madrid',
			'cdmx',
			'buenos-aires',
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
