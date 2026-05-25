import { describe, expect, it, vi } from 'vitest';

describe('loadPopulationData con datos inválidos', () => {
	it('falla si destinations está vacío', async () => {
		vi.resetModules();
		vi.doMock('../data/destinations.json', () => ({ default: { destinations: [] } }));
		const { loadPopulationData } = await import('./population');
		expect(() => loadPopulationData()).toThrow(/destinations/);
		vi.doUnmock('../data/destinations.json');
	});

	it('falla si references está vacío', async () => {
		vi.resetModules();
		vi.doMock('../data/peru-references.json', () => ({ default: { references: [] } }));
		const { loadPopulationData } = await import('./population');
		expect(() => loadPopulationData()).toThrow(/referente/);
		vi.doUnmock('../data/peru-references.json');
	});

	it('falla si destino tiene población negativa', async () => {
		vi.resetModules();
		vi.doMock('../data/destinations.json', () => ({
			default: {
				destinations: [
					{
						id: 'bad',
						cityName: 'X',
						countryName: 'Y',
						countryCode: 'ES',
						cityPopulation: -1,
						countryPopulation: 1,
						citySource: 's',
						countrySource: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadPopulationData } = await import('./population');
		expect(() => loadPopulationData()).toThrow(/poblaciones inválidas/);
		vi.doUnmock('../data/destinations.json');
	});

	it('falla si referente tiene kind inválido', async () => {
		vi.resetModules();
		vi.doMock('../data/peru-references.json', () => ({
			default: {
				references: [
					{
						id: 'x',
						name: 'X',
						kind: 'invalid',
						population: 1,
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadPopulationData } = await import('./population');
		expect(() => loadPopulationData()).toThrow(/kind inválido/);
		vi.doUnmock('../data/peru-references.json');
	});

	// @spec DV-02
	it('falla si destino no tiene countryCode ISO válido', async () => {
		vi.resetModules();
		vi.doMock('../data/destinations.json', () => ({
			default: {
				destinations: [
					{
						id: 'bad',
						cityName: 'X',
						countryName: 'Y',
						countryCode: 'esp',
						cityPopulation: 1,
						countryPopulation: 1,
						citySource: 's',
						countrySource: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadPopulationData } = await import('./population');
		expect(() => loadPopulationData()).toThrow(/countryCode/);
		vi.doUnmock('../data/destinations.json');
	});
});

describe('destino london (add-destination-england)', () => {
	// @spec PC-15
	it('loadPopulationData incluye london con Londres y Reino Unido', async () => {
		vi.resetModules();
		vi.doUnmock('../data/destinations.json');
		vi.doUnmock('../data/peru-references.json');
		const { loadPopulationData } = await import('./population');
		const data = loadPopulationData();
		const london = data.destinations.find((d) => d.id === 'london');
		expect(london).toBeDefined();
		expect(london?.cityName).toBe('Londres');
		expect(london?.countryName).toBe('Reino Unido');
		expect(london?.cityPopulation).toBeGreaterThan(0);
		expect(london?.countryPopulation).toBeGreaterThan(0);
		expect(london?.citySource).toMatch(/ONS/i);
		expect(london?.countryCode).toBe('GB');
	});
});

describe('destinos París, Tokio y Nueva York (add-curated-destinations-paris-tokyo-nyc)', () => {
	// @spec PC-17
	it('loadPopulationData incluye paris, tokyo y new-york con datos válidos', async () => {
		vi.resetModules();
		vi.doUnmock('../data/destinations.json');
		vi.doUnmock('../data/peru-references.json');
		const { loadPopulationData } = await import('./population');
		const data = loadPopulationData();
		const expected = [
			{ id: 'paris', city: 'París', country: 'Francia', code: 'FR' },
			{ id: 'tokyo', city: 'Tokio', country: 'Japón', code: 'JP' },
			{ id: 'new-york', city: 'Nueva York', country: 'Estados Unidos', code: 'US' },
		] as const;
		for (const { id, city, country, code } of expected) {
			const dest = data.destinations.find((d) => d.id === id);
			expect(dest).toBeDefined();
			expect(dest?.cityName).toBe(city);
			expect(dest?.countryName).toBe(country);
			expect(dest?.countryCode).toBe(code);
			expect(dest?.cityPopulation).toBeGreaterThan(0);
			expect(dest?.countryPopulation).toBeGreaterThan(0);
		}
	});
});
