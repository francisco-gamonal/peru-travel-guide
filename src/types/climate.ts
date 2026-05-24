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
