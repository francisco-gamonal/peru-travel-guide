import climateFile from '../data/climate.json';
import type {
	BestTimeToVisit,
	ClimateData,
	ClimateDestination,
	ClimateFile,
	ClimateSeason,
	ClimateWidgetView,
} from '../types/climate';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function parseStringArray(value: unknown, label: string): string[] {
	if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
		throw new Error(`${label}: months debe ser un array de strings`);
	}
	return value;
}

function parseClimateSeason(value: unknown, index: number): ClimateSeason {
	if (!isRecord(value)) {
		throw new Error(`seasons[${index}]: se esperaba un objeto`);
	}
	const { name, tempRangeC, rainfall, description } = value;
	if (
		typeof name !== 'string' ||
		typeof tempRangeC !== 'string' ||
		typeof rainfall !== 'string' ||
		typeof description !== 'string'
	) {
		throw new Error(`seasons[${index}]: campos de texto inválidos`);
	}
	return { name, tempRangeC, rainfall, description };
}

function parseBestTimeToVisit(value: unknown, index: number): BestTimeToVisit {
	if (!isRecord(value)) {
		throw new Error(`bestTimeToVisit[${index}]: se esperaba un objeto`);
	}
	const { label, months, reason } = value;
	if (typeof label !== 'string' || typeof reason !== 'string') {
		throw new Error(`bestTimeToVisit[${index}]: label y reason deben ser string`);
	}
	return {
		label,
		months: parseStringArray(months, `bestTimeToVisit[${index}]`),
		reason,
	};
}

function parseClimateDestination(value: unknown, index: number): ClimateDestination {
	if (!isRecord(value)) {
		throw new Error(`destinations[${index}]: se esperaba un objeto`);
	}
	const { destinationId, summary, seasons, bestTimeToVisit, source, year } = value;
	if (
		typeof destinationId !== 'string' ||
		typeof summary !== 'string' ||
		typeof source !== 'string' ||
		typeof year !== 'number'
	) {
		throw new Error(`destinations[${index}]: campos obligatorios inválidos`);
	}
	if (!Array.isArray(seasons) || seasons.length === 0) {
		throw new Error(`destinations[${index}]: se requiere al menos una estación`);
	}
	if (!Array.isArray(bestTimeToVisit) || bestTimeToVisit.length === 0) {
		throw new Error(`destinations[${index}]: se requiere al menos una ventana recomendada`);
	}
	const sourceUrl = value.sourceUrl;
	if (sourceUrl !== undefined && typeof sourceUrl !== 'string') {
		throw new Error(`destinations[${index}]: sourceUrl inválido`);
	}
	return {
		destinationId,
		summary,
		seasons: seasons.map(parseClimateSeason),
		bestTimeToVisit: bestTimeToVisit.map(parseBestTimeToVisit),
		source,
		year,
		...(sourceUrl ? { sourceUrl } : {}),
	};
}

function parseClimateFile(raw: unknown): ClimateDestination[] {
	if (!isRecord(raw) || !Array.isArray(raw.destinations)) {
		throw new Error('climate.json: formato inválido');
	}
	return raw.destinations.map(parseClimateDestination);
}

/** Carga y valida datos climáticos en tiempo de build. */
export function loadClimateData(): ClimateData {
	const destinations = parseClimateFile(climateFile as ClimateFile);
	if (destinations.length === 0) {
		throw new Error('climate.json: se requiere al menos un destino');
	}
	return { destinations };
}

export function getClimateByDestinationId(
	data: ClimateData,
	id: string | null | undefined,
): ClimateDestination | null {
	if (!id) {
		return null;
	}
	return data.destinations.find((d) => d.destinationId === id) ?? null;
}

/** Vista compacta para el widget de clima en la ficha de destino. */
export function buildClimateWidgetView(climate: ClimateDestination): ClimateWidgetView {
	return {
		summary: climate.summary,
		seasons: climate.seasons.map((season) => ({
			name: season.name,
			tempRangeC: season.tempRangeC,
			rainfall: season.rainfall,
			description: season.description,
		})),
		bestTimes: climate.bestTimeToVisit.map((window) => ({
			label: window.label,
			monthsFormatted: formatMonthRange(window.months),
			reason: window.reason,
		})),
		sourceFooter: {
			source: climate.source,
			year: climate.year,
			...(climate.sourceUrl ? { sourceUrl: climate.sourceUrl } : {}),
		},
	};
}

/** Formatea meses abreviados para lectura (p. ej. Abr, May, Jun → Abr a Jun). */
export function formatMonthRange(months: string[]): string {
	if (months.length === 0) {
		return '';
	}
	if (months.length === 1) {
		return months[0]!;
	}
	return `${months[0]} a ${months[months.length - 1]}`;
}
