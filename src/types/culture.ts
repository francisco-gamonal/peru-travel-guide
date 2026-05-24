export interface CultureTip {
	title: string;
	body: string;
}

export interface CultureDestination {
	destinationId: string;
	summary: string;
	tips: CultureTip[];
	source: string;
	year: number;
	sourceUrl?: string;
}

export interface CultureFile {
	destinations: CultureDestination[];
}

export interface CultureData {
	destinations: CultureDestination[];
}

export interface CultureTipRow {
	title: string;
	body: string;
}

export interface CultureSourceFooter {
	source: string;
	year: number;
	sourceUrl?: string;
}

export interface CultureWidgetView {
	summary: string;
	tips: CultureTipRow[];
	sourceFooter: CultureSourceFooter;
}
