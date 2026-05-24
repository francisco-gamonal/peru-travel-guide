import destinationsFile from '../data/destinations.json';
import peruReferencesFile from '../data/peru-references.json';
import type {
	ComparisonRow,
	Destination,
	DestinationsFile,
	PopulationData,
	PopulationPlace,
	PeruReference,
	PeruReferencesFile,
} from '../types/population';

const populationFormatter = new Intl.NumberFormat('es-PE');

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function parsePopulationPlace(value: unknown, label: string): PopulationPlace {
	if (!isRecord(value)) {
		throw new Error(`${label}: se esperaba un objeto`);
	}
	const { id, name, population, source, year } = value;
	if (typeof id !== 'string' || typeof name !== 'string') {
		throw new Error(`${label}: id y name deben ser string`);
	}
	if (typeof population !== 'number' || population < 0) {
		throw new Error(`${label}: population debe ser un número >= 0`);
	}
	if (typeof source !== 'string' || typeof year !== 'number') {
		throw new Error(`${label}: source y year son obligatorios`);
	}
	const sourceUrl = value.sourceUrl;
	if (sourceUrl !== undefined && typeof sourceUrl !== 'string') {
		throw new Error(`${label}: sourceUrl debe ser string`);
	}
	return {
		id,
		name,
		population,
		source,
		year,
		...(sourceUrl ? { sourceUrl } : {}),
	};
}

function parsePeruReference(value: unknown, index: number): PeruReference {
	const base = parsePopulationPlace(value, `references[${index}]`);
	if (!isRecord(value)) {
		throw new Error(`references[${index}]: se esperaba un objeto`);
	}
	const kind = value.kind;
	if (kind !== 'country' && kind !== 'province' && kind !== 'district') {
		throw new Error(`references[${index}]: kind inválido`);
	}
	return { ...base, kind };
}

function parseDestination(value: unknown, index: number): Destination {
	if (!isRecord(value)) {
		throw new Error(`destinations[${index}]: se esperaba un objeto`);
	}
	const {
		id,
		cityName,
		countryName,
		cityPopulation,
		countryPopulation,
		citySource,
		countrySource,
		year,
	} = value;
	if (
		typeof id !== 'string' ||
		typeof cityName !== 'string' ||
		typeof countryName !== 'string' ||
		typeof citySource !== 'string' ||
		typeof countrySource !== 'string' ||
		typeof year !== 'number'
	) {
		throw new Error(`destinations[${index}]: campos de texto o year inválidos`);
	}
	if (
		typeof cityPopulation !== 'number' ||
		typeof countryPopulation !== 'number' ||
		cityPopulation < 0 ||
		countryPopulation < 0
	) {
		throw new Error(`destinations[${index}]: poblaciones inválidas`);
	}
	const citySourceUrl = value.citySourceUrl;
	const countrySourceUrl = value.countrySourceUrl;
	if (citySourceUrl !== undefined && typeof citySourceUrl !== 'string') {
		throw new Error(`destinations[${index}]: citySourceUrl inválido`);
	}
	if (countrySourceUrl !== undefined && typeof countrySourceUrl !== 'string') {
		throw new Error(`destinations[${index}]: countrySourceUrl inválido`);
	}
	return {
		id,
		cityName,
		countryName,
		cityPopulation,
		countryPopulation,
		citySource,
		countrySource,
		year,
		...(citySourceUrl ? { citySourceUrl } : {}),
		...(countrySourceUrl ? { countrySourceUrl } : {}),
	};
}

function parsePeruReferencesFile(raw: unknown): PeruReference[] {
	if (!isRecord(raw) || !Array.isArray(raw.references)) {
		throw new Error('peru-references.json: formato inválido');
	}
	return raw.references.map(parsePeruReference);
}

function parseDestinationsFile(raw: unknown): Destination[] {
	if (!isRecord(raw) || !Array.isArray(raw.destinations)) {
		throw new Error('destinations.json: formato inválido');
	}
	return raw.destinations.map(parseDestination);
}

/** Carga y valida datos de población en tiempo de build. */
export function loadPopulationData(): PopulationData {
	const references = parsePeruReferencesFile(peruReferencesFile as PeruReferencesFile);
	const destinations = parseDestinationsFile(destinationsFile as DestinationsFile);
	if (references.length === 0) {
		throw new Error('peru-references.json: se requiere al menos un referente');
	}
	if (destinations.length === 0) {
		throw new Error('destinations.json: se requiere al menos un destino');
	}
	return { references, destinations };
}

export function getDefaultDestinationId(data: PopulationData): string {
	return data.destinations[0]?.id ?? '';
}

export function getDestinationById(
	data: PopulationData,
	id: string | null | undefined,
): Destination | null {
	if (!id) {
		return null;
	}
	return data.destinations.find((d) => d.id === id) ?? null;
}

export function resolveDestination(
	data: PopulationData,
	id: string | null | undefined,
): Destination {
	return getDestinationById(data, id) ?? data.destinations[0]!;
}

export function getLimaProvinceReference(references: PeruReference[]): PeruReference {
	const lima = references.find((r) => r.id === 'lima-province');
	if (!lima) {
		throw new Error('Falta referente lima-province en peru-references.json');
	}
	return lima;
}

export function formatPopulation(value: number): string {
	return populationFormatter.format(value);
}

export function computeRatio(numerator: number, denominator: number): number {
	if (denominator === 0) {
		return 0;
	}
	return numerator / denominator;
}

/**
 * Verificación manual (datos curados 2024):
 * Madrid ciudad ~3.4M vs provincia de Lima ~10.3M → ~0.33× (aprox. un tercio de Lima).
 */
export function ratioLabel(
	numeratorLabel: string,
	numerator: number,
	denominatorLabel: string,
	denominator: number,
): string {
	const ratio = computeRatio(numerator, denominator);
	if (ratio >= 1) {
		const times = ratio.toLocaleString('es-PE', { maximumFractionDigits: 1 });
		return `${numeratorLabel} tiene unas ${times} veces la población de ${denominatorLabel}.`;
	}
	const percent = (ratio * 100).toLocaleString('es-PE', { maximumFractionDigits: 0 });
	return `${numeratorLabel} representa aproximadamente el ${percent} % de la población de ${denominatorLabel}.`;
}

export function buildComparisonRows(
	destination: Destination,
	references: PeruReference[],
): ComparisonRow[] {
	const cityRow: ComparisonRow = {
		id: `${destination.id}-city`,
		label: `${destination.cityName} (ciudad)`,
		population: destination.cityPopulation,
		source: destination.citySource,
		year: destination.year,
		sourceUrl: destination.citySourceUrl,
		kind: 'destination-city',
	};
	const countryRow: ComparisonRow = {
		id: `${destination.id}-country`,
		label: `${destination.countryName} (país)`,
		population: destination.countryPopulation,
		source: destination.countrySource,
		year: destination.year,
		sourceUrl: destination.countrySourceUrl,
		kind: 'destination-country',
	};
	const referenceRows: ComparisonRow[] = references.map((ref) => ({
		id: ref.id,
		label: ref.name,
		population: ref.population,
		source: ref.source,
		year: ref.year,
		sourceUrl: ref.sourceUrl,
		kind: ref.kind,
	}));
	return [cityRow, countryRow, ...referenceRows];
}

export function barWidthPercent(population: number, maxPopulation: number): number {
	if (maxPopulation <= 0) {
		return 0;
	}
	return Math.min(100, Math.round((population / maxPopulation) * 100));
}
