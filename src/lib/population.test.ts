import { describe, expect, it } from 'vitest';
import {
	barWidthPercent,
	buildComparisonRows,
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

