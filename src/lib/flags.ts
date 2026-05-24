import arFlag from '../assets/flags/ar.svg?url';
import esFlag from '../assets/flags/es.svg?url';
import gbFlag from '../assets/flags/gb.svg?url';
import mxFlag from '../assets/flags/mx.svg?url';
import peFlag from '../assets/flags/pe.svg?url';

export const PERU_COUNTRY_CODE = 'PE';

export const SUPPORTED_COUNTRY_CODES = ['PE', 'ES', 'MX', 'AR', 'GB'] as const;

export type CountryCode = (typeof SUPPORTED_COUNTRY_CODES)[number];

export type FlagSize = 'sm' | 'md';

const FLAG_URLS: Record<CountryCode, string> = {
	PE: peFlag,
	ES: esFlag,
	MX: mxFlag,
	AR: arFlag,
	GB: gbFlag,
};

const FLAG_DIMENSIONS: Record<FlagSize, { width: number; height: number }> = {
	sm: { width: 24, height: 18 },
	md: { width: 32, height: 24 },
};

function isCountryCode(value: string): value is CountryCode {
	return (SUPPORTED_COUNTRY_CODES as readonly string[]).includes(value);
}

/** Devuelve la URL del SVG de bandera para un código ISO 3166-1 alpha-2. */
export function getFlagAsset(countryCode: string): string {
	const normalized = countryCode.trim().toUpperCase();
	if (!isCountryCode(normalized)) {
		throw new Error(`countryCode no soportado: ${countryCode}`);
	}
	return FLAG_URLS[normalized];
}

export function getFlagDimensions(size: FlagSize = 'sm'): { width: number; height: number } {
	return FLAG_DIMENSIONS[size];
}

/** Texto alternativo en español para banderas de país. */
export function formatFlagAlt(countryName: string): string {
	if (countryName === 'Perú') {
		return 'Bandera del Perú';
	}
	return `Bandera de ${countryName}`;
}

export function isValidCountryCode(countryCode: unknown): countryCode is string {
	return typeof countryCode === 'string' && /^[A-Z]{2}$/.test(countryCode);
}
