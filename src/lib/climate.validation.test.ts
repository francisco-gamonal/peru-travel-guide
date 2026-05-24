import { describe, expect, it, vi } from 'vitest';

describe('loadClimateData con datos inválidos', () => {
	it('falla si destinations está vacío', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({ default: { destinations: [] } }));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/climate.json/);
		vi.doUnmock('../data/climate.json');
	});

	it('falla si falta bestTimeToVisit', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						seasons: [
							{
								name: 'n',
								tempRangeC: '1',
								rainfall: 'r',
								description: 'd',
							},
						],
						bestTimeToVisit: [],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/ventana recomendada/);
		vi.doUnmock('../data/climate.json');
	});

	it('falla si seasons está vacío', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						seasons: [],
						bestTimeToVisit: [{ label: 'l', months: ['Ene'], reason: 'r' }],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/estación/);
		vi.doUnmock('../data/climate.json');
	});

	it('falla si season tiene campos inválidos', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						seasons: [{ name: 1 }],
						bestTimeToVisit: [{ label: 'l', months: ['Ene'], reason: 'r' }],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/campos de texto/);
		vi.doUnmock('../data/climate.json');
	});

	it('falla si sourceUrl no es string', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						seasons: [
							{
								name: 'n',
								tempRangeC: '1',
								rainfall: 'r',
								description: 'd',
							},
						],
						bestTimeToVisit: [{ label: 'l', months: ['Ene'], reason: 'r' }],
						source: 's',
						year: 2024,
						sourceUrl: 99,
					},
				],
			},
		}));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/sourceUrl/);
		vi.doUnmock('../data/climate.json');
	});

	it('falla si months no es array de strings', async () => {
		vi.resetModules();
		vi.doMock('../data/climate.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						seasons: [
							{
								name: 'n',
								tempRangeC: '1',
								rainfall: 'r',
								description: 'd',
							},
						],
						bestTimeToVisit: [{ label: 'l', months: [1], reason: 'r' }],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadClimateData } = await import('./climate');
		expect(() => loadClimateData()).toThrow(/months/);
		vi.doUnmock('../data/climate.json');
	});
});
