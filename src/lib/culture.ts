import cultureFile from '../data/culture.json';
import type {
	CultureData,
	CultureDestination,
	CultureFile,
	CultureTip,
	CultureWidgetView,
} from '../types/culture';

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function parseCultureTip(value: unknown, index: number): CultureTip {
	if (!isRecord(value)) {
		throw new Error(`tips[${index}]: se esperaba un objeto`);
	}
	const { title, body } = value;
	if (typeof title !== 'string' || typeof body !== 'string') {
		throw new Error(`tips[${index}]: title y body deben ser string`);
	}
	return { title, body };
}

function parseCultureDestination(value: unknown, index: number): CultureDestination {
	if (!isRecord(value)) {
		throw new Error(`destinations[${index}]: se esperaba un objeto`);
	}
	const { destinationId, summary, tips, source, year } = value;
	if (
		typeof destinationId !== 'string' ||
		typeof summary !== 'string' ||
		typeof source !== 'string' ||
		typeof year !== 'number'
	) {
		throw new Error(`destinations[${index}]: campos obligatorios inválidos`);
	}
	if (!Array.isArray(tips) || tips.length < 3) {
		throw new Error(`destinations[${index}]: se requieren al menos tres consejos`);
	}
	const sourceUrl = value.sourceUrl;
	if (sourceUrl !== undefined && typeof sourceUrl !== 'string') {
		throw new Error(`destinations[${index}]: sourceUrl inválido`);
	}
	return {
		destinationId,
		summary,
		tips: tips.map(parseCultureTip),
		source,
		year,
		...(sourceUrl ? { sourceUrl } : {}),
	};
}

function parseCultureFile(raw: unknown): CultureDestination[] {
	if (!isRecord(raw) || !Array.isArray(raw.destinations)) {
		throw new Error('culture.json: formato inválido');
	}
	return raw.destinations.map(parseCultureDestination);
}

/** Carga y valida datos culturales en tiempo de build. */
export function loadCultureData(): CultureData {
	const destinations = parseCultureFile(cultureFile as CultureFile);
	if (destinations.length === 0) {
		throw new Error('culture.json: se requiere al menos un destino');
	}
	return { destinations };
}

export function getCultureByDestinationId(
	data: CultureData,
	id: string | null | undefined,
): CultureDestination | null {
	if (!id) {
		return null;
	}
	return data.destinations.find((d) => d.destinationId === id) ?? null;
}

/** Vista compacta para el widget cultural en la ficha de destino. */
export function buildCultureWidgetView(culture: CultureDestination): CultureWidgetView {
	return {
		summary: culture.summary,
		tips: culture.tips.map((tip) => ({
			title: tip.title,
			body: tip.body,
		})),
		sourceFooter: {
			source: culture.source,
			year: culture.year,
			...(culture.sourceUrl ? { sourceUrl: culture.sourceUrl } : {}),
		},
	};
}
