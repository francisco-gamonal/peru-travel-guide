import { describe, expect, it } from 'vitest';
import {
	formatFlagAlt,
	getFlagAsset,
	getFlagDimensions,
	isValidCountryCode,
	PERU_COUNTRY_CODE,
	SUPPORTED_COUNTRY_CODES,
} from './flags';

describe('flags (destination-visuals)', () => {
	// @spec DV-01
	it('mapea countryCode válidos a assets de bandera', () => {
		for (const code of SUPPORTED_COUNTRY_CODES) {
			const src = getFlagAsset(code);
			expect(src.length).toBeGreaterThan(0);
			expect(src).toMatch(/\.svg$|data:image\/svg\+xml/);
		}
		expect(getFlagAsset(PERU_COUNTRY_CODE)).toMatch(/pe\.svg$|data:image\/svg\+xml/);
	});

	it('rechaza countryCode desconocido', () => {
		expect(() => getFlagAsset('ZZ')).toThrow(/no soportado/);
	});

	it('expone dimensiones fijas por tamaño', () => {
		expect(getFlagDimensions('sm')).toEqual({ width: 24, height: 18 });
		expect(getFlagDimensions('md')).toEqual({ width: 32, height: 24 });
	});

	it('genera alt en español', () => {
		expect(formatFlagAlt('Perú')).toBe('Bandera del Perú');
		expect(formatFlagAlt('España')).toBe('Bandera de España');
	});

	it('valida formato ISO alpha-2', () => {
		expect(isValidCountryCode('ES')).toBe(true);
		expect(isValidCountryCode('es')).toBe(false);
		expect(isValidCountryCode('ESP')).toBe(false);
	});

	// @spec DV-09
	it('mapea countryCode FR, JP y US a assets de bandera', () => {
		for (const code of ['FR', 'JP', 'US'] as const) {
			const src = getFlagAsset(code);
			expect(src.length).toBeGreaterThan(0);
			expect(src).toMatch(/\.svg$|data:image\/svg\+xml/);
		}
	});
});
