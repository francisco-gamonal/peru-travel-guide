/** Metadatos de fuente para cifras de población. */
export interface PopulationSourceMeta {
	source: string;
	year: number;
	sourceUrl?: string;
}

/** Lugar con población y atribución. */
export interface PopulationPlace extends PopulationSourceMeta {
	id: string;
	name: string;
	population: number;
}

/** Referente peruano (país, provincia o distrito). */
export interface PeruReference extends PopulationPlace {
	kind: 'country' | 'province' | 'district';
}

/** Destino internacional curado para comparación. */
export interface Destination {
	id: string;
	cityName: string;
	countryName: string;
	/** ISO 3166-1 alpha-2 (p. ej. ES, GB). */
	countryCode: string;
	cityPopulation: number;
	countryPopulation: number;
	citySource: string;
	countrySource: string;
	year: number;
	citySourceUrl?: string;
	countrySourceUrl?: string;
}

export interface PeruReferencesFile {
	references: PeruReference[];
}

export interface DestinationsFile {
	destinations: Destination[];
}

export interface PopulationData {
	references: PeruReference[];
	destinations: Destination[];
}

/** Barra horizontal en el widget de comparación (escala ya calculada). */
export interface PopulationBarItem {
	label: string;
	population: number;
	widthPercent: number;
	source: string;
	year: number;
	sourceUrl?: string;
	/** ISO 3166-1 alpha-2; solo en barras «Por país». */
	countryCode?: string;
}

/** Vista agrupada país → ciudad para un único widget de UI. */
export interface PopulationComparisonView {
	destinationTitle: string;
	cityRatioSentence: string;
	countryBars: PopulationBarItem[];
	cityBars: PopulationBarItem[];
	districts: PopulationPlace[];
	sourcesFooter: PopulationSourceMeta[];
}

/** Fila lista para comparar en la UI. */
export interface ComparisonRow {
	id: string;
	label: string;
	population: number;
	source: string;
	year: number;
	sourceUrl?: string;
	kind?: PeruReference['kind'] | 'destination-city' | 'destination-country';
}
