export interface ClimateSeason {
	name: string;
	tempRangeC: string;
	rainfall: string;
	description: string;
}

export interface BestTimeToVisit {
	label: string;
	months: string[];
	reason: string;
}

export interface ClimateDestination {
	destinationId: string;
	summary: string;
	seasons: ClimateSeason[];
	bestTimeToVisit: BestTimeToVisit[];
	source: string;
	year: number;
	sourceUrl?: string;
}

export interface ClimateFile {
	destinations: ClimateDestination[];
}

export interface ClimateData {
	destinations: ClimateDestination[];
}

export interface ClimateSeasonRow {
	name: string;
	tempRangeC: string;
	rainfall: string;
	description: string;
}

export interface ClimateBestTimeRow {
	label: string;
	monthsFormatted: string;
	reason: string;
}

export interface ClimateSourceFooter {
	source: string;
	year: number;
	sourceUrl?: string;
}

export interface ClimateWidgetView {
	summary: string;
	seasons: ClimateSeasonRow[];
	bestTimes: ClimateBestTimeRow[];
	sourceFooter: ClimateSourceFooter;
}
