import { describe, expect, it, vi } from 'vitest';

describe('loadCultureData con datos inválidos', () => {
	it('falla si destinations está vacío', async () => {
		vi.resetModules();
		vi.doMock('../data/culture.json', () => ({ default: { destinations: [] } }));
		const { loadCultureData } = await import('./culture');
		expect(() => loadCultureData()).toThrow(/culture.json/);
		vi.doUnmock('../data/culture.json');
	});

	it('falla si tips tiene menos de tres elementos', async () => {
		vi.resetModules();
		vi.doMock('../data/culture.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						tips: [
							{ title: 'a', body: 'b' },
							{ title: 'c', body: 'd' },
						],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadCultureData } = await import('./culture');
		expect(() => loadCultureData()).toThrow(/tres consejos/);
		vi.doUnmock('../data/culture.json');
	});

	it('falla si tip tiene campos inválidos', async () => {
		vi.resetModules();
		vi.doMock('../data/culture.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						tips: [
							{ title: 'a', body: 'b' },
							{ title: 'c', body: 'd' },
							{ title: 1, body: 'e' },
						],
						source: 's',
						year: 2024,
					},
				],
			},
		}));
		const { loadCultureData } = await import('./culture');
		expect(() => loadCultureData()).toThrow(/title y body/);
		vi.doUnmock('../data/culture.json');
	});

	it('falla si sourceUrl no es string', async () => {
		vi.resetModules();
		vi.doMock('../data/culture.json', () => ({
			default: {
				destinations: [
					{
						destinationId: 'x',
						summary: 's',
						tips: [
							{ title: 'a', body: 'b' },
							{ title: 'c', body: 'd' },
							{ title: 'e', body: 'f' },
						],
						source: 's',
						year: 2024,
						sourceUrl: 99,
					},
				],
			},
		}));
		const { loadCultureData } = await import('./culture');
		expect(() => loadCultureData()).toThrow(/sourceUrl/);
		vi.doUnmock('../data/culture.json');
	});
});

describe('destino london (add-destination-england)', () => {
	// @spec CU-08
	it('loadCultureData incluye london con al menos tres consejos', async () => {
		vi.resetModules();
		vi.doUnmock('../data/culture.json');
		const { loadCultureData, getCultureByDestinationId } = await import('./culture');
		const data = loadCultureData();
		const london = getCultureByDestinationId(data, 'london');
		expect(london).toBeDefined();
		expect(london?.summary).toMatch(/Londres/i);
		expect(london?.tips.length).toBeGreaterThanOrEqual(3);
		expect(london?.tips.every((t) => t.title && t.body)).toBe(true);
	});
});
