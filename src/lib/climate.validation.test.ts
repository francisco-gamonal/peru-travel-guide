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

describe('destino london (add-destination-england)', () => {
	// @spec DC-09
	it('loadClimateData incluye london con resumen y ventanas recomendadas', async () => {
		vi.resetModules();
		vi.doUnmock('../data/climate.json');
		const { loadClimateData, getClimateByDestinationId } = await import('./climate');
		const data = loadClimateData();
		const london = getClimateByDestinationId(data, 'london');
		expect(london).toBeDefined();
		expect(london?.summary).toMatch(/oceánico/i);
		expect(london?.seasons.length).toBeGreaterThanOrEqual(1);
		expect(london?.bestTimeToVisit.length).toBeGreaterThanOrEqual(1);
		expect(london?.source).toBeTruthy();
	});
});

describe('destinos París, Tokio y Nueva York (add-curated-destinations-paris-tokyo-nyc)', () => {
	// @spec DC-11
	it('loadClimateData incluye paris, tokyo y new-york con resumen y ventanas', async () => {
		vi.resetModules();
		vi.doUnmock('../data/climate.json');
		const { loadClimateData, getClimateByDestinationId } = await import('./climate');
		const data = loadClimateData();
		for (const id of ['paris', 'tokyo', 'new-york'] as const) {
			const climate = getClimateByDestinationId(data, id);
			expect(climate).toBeDefined();
			expect(climate?.summary.length).toBeGreaterThan(0);
			expect(climate?.seasons.length).toBeGreaterThanOrEqual(1);
			expect(climate?.bestTimeToVisit.length).toBeGreaterThanOrEqual(1);
		}
		const paris = getClimateByDestinationId(data, 'paris');
		expect(paris?.summary).toMatch(/oceánico/i);
		const tokyo = getClimateByDestinationId(data, 'tokyo');
		expect(tokyo?.summary).toMatch(/subtropical/i);
		const nyc = getClimateByDestinationId(data, 'new-york');
		expect(nyc?.summary).toMatch(/continental húmedo/i);
	});
});
