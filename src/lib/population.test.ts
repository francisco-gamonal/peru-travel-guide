import { describe, expect, it } from 'vitest';
import {
	barWidthPercent,
	buildComparisonRows,
	buildPopulationComparisonView,
	collectSourcesFooter,
	computeRatio,
	formatPopulation,
	getDefaultDestinationId,
	getDestinationById,
	getLimaProvinceReference,
	loadPopulationData,
	ratioLabel,
	resolveDestination,
} from './population';

describe('loadPopulationData', () => {
	it('carga referentes y destinos válidos', () => {
		const data = loadPopulationData();
		expect(data.references.length).toBeGreaterThanOrEqual(2);
		expect(data.destinations.length).toBeGreaterThanOrEqual(1);
		expect(data.destinations[0]?.id).toBe('madrid');
	});
});

describe('getDestinationById', () => {
	const data = loadPopulationData();

	it('resuelve madrid y cdmx', () => {
		expect(getDestinationById(data, 'madrid')?.cityName).toBe('Madrid');
		expect(getDestinationById(data, 'cdmx')?.cityName).toBe('Ciudad de México');
	});

	it('resuelve london con Reino Unido', () => {
		const london = getDestinationById(data, 'london');
		expect(london?.cityName).toBe('Londres');
		expect(london?.countryName).toBe('Reino Unido');
	});

	it('devuelve null para id inválido o vacío', () => {
		expect(getDestinationById(data, 'no-existe')).toBeNull();
		expect(getDestinationById(data, null)).toBeNull();
		expect(getDestinationById(data, '')).toBeNull();
	});
});

describe('resolveDestination', () => {
	const data = loadPopulationData();

	it('usa el primero si el id no existe', () => {
		const d = resolveDestination(data, 'invalid');
		expect(d.id).toBe('madrid');
	});
});

describe('getDefaultDestinationId', () => {
	it('coincide con el primer destino', () => {
		const data = loadPopulationData();
		expect(getDefaultDestinationId(data)).toBe(data.destinations[0]?.id);
	});
});

describe('getLimaProvinceReference', () => {
	it('encuentra provincia de Lima', () => {
		const data = loadPopulationData();
		const lima = getLimaProvinceReference(data.references);
		expect(lima.id).toBe('lima-province');
	});

	it('lanza si falta lima-province', () => {
		expect(() => getLimaProvinceReference([])).toThrow(/lima-province/);
	});
});

describe('formatPopulation', () => {
	it('formatea con separadores es-PE', () => {
		expect(formatPopulation(3401900)).toMatch(/3[,.]401[,.]900/);
	});
});

describe('computeRatio', () => {
	it('calcula ratio y evita división por cero', () => {
		expect(computeRatio(10, 5)).toBe(2);
		expect(computeRatio(1, 0)).toBe(0);
	});
});

describe('ratioLabel', () => {
	const data = loadPopulationData();
	const madrid = data.destinations.find((d) => d.id === 'madrid')!;
	const lima = getLimaProvinceReference(data.references);

	it('describe relación porcentual cuando el numerador es menor', () => {
		const label = ratioLabel(
			'Madrid (ciudad)',
			madrid.cityPopulation,
			lima.name,
			lima.population,
		);
		expect(label).toContain('%');
		expect(label).toContain('Lima');
	});

	it('describe múltiplo cuando el numerador es mayor', () => {
		const label = ratioLabel('Ciudad grande', 20_000_000, 'Lima', 10_000_000);
		expect(label).toContain('veces');
	});
});

describe('buildPopulationComparisonView', () => {
	it('agrupa país Perú vs país destino y ciudad vs Lima', () => {
		const data = loadPopulationData();
		const madrid = data.destinations.find((d) => d.id === 'madrid')!;
		const view = buildPopulationComparisonView(madrid, data.references);
		expect(view.countryBars).toHaveLength(2);
		expect(view.countryBars[0]?.label).toBe('Perú');
		expect(view.countryBars[1]?.label).toBe('España');
		expect(view.cityBars[0]?.label).toContain('Lima');
		expect(view.cityBars[1]?.label).toBe('Madrid');
	});

	it('incluye distritos y fuentes deduplicadas en el pie', () => {
		const data = loadPopulationData();
		const madrid = data.destinations[0]!;
		const view = buildPopulationComparisonView(madrid, data.references);
		expect(view.districts.length).toBeGreaterThanOrEqual(2);
		expect(view.sourcesFooter.length).toBeGreaterThan(0);
		const keys = view.sourcesFooter.map((s) => `${s.source}-${s.year}`);
		expect(new Set(keys).size).toBe(keys.length);
	});
});

describe('collectSourcesFooter', () => {
	it('elimina duplicados', () => {
		const result = collectSourcesFooter([
			{ source: 'INEI', year: 2022 },
			{ source: 'INEI', year: 2022 },
			{ source: 'INE', year: 2024 },
		]);
		expect(result).toHaveLength(2);
	});
});

describe('buildComparisonRows', () => {
	it('incluye ciudad, país y referentes', () => {
		const data = loadPopulationData();
		const madrid = data.destinations[0]!;
		const rows = buildComparisonRows(madrid, data.references);
		expect(rows[0]?.label).toContain('Madrid');
		expect(rows.some((r) => r.kind === 'destination-country')).toBe(true);
		expect(rows.some((r) => r.id === 'peru')).toBe(true);
	});
});

describe('barWidthPercent', () => {
	it('normaliza al máximo y limita a 100', () => {
		expect(barWidthPercent(50, 100)).toBe(50);
		expect(barWidthPercent(200, 100)).toBe(100);
		expect(barWidthPercent(10, 0)).toBe(0);
	});
});

