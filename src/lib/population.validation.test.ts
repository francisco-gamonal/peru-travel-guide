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
});
