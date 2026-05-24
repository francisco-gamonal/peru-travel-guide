import { describe, expect, it } from 'vitest';
import {
	buildCultureWidgetView,
	getCultureByDestinationId,
	loadCultureData,
} from './culture';

describe('loadCultureData', () => {
	it('carga cultura para los destinos curados', () => {
		const data = loadCultureData();
		expect(data.destinations).toHaveLength(4);
		expect(data.destinations.map((d) => d.destinationId)).toEqual([
			'madrid',
			'cdmx',
			'buenos-aires',
			'london',
		]);
	});

});

describe('getCultureByDestinationId', () => {
	const data = loadCultureData();

	it('resuelve madrid con sobremesa', () => {
		const madrid = getCultureByDestinationId(data, 'madrid');
		expect(madrid?.summary).toMatch(/Madrid/i);
		expect(madrid?.tips.length).toBeGreaterThanOrEqual(3);
		expect(madrid?.tips.some((t) => /sobremesa/i.test(t.body))).toBe(true);
	});

	it('resuelve cdmx con propina', () => {
		const cdmx = getCultureByDestinationId(data, 'cdmx');
		expect(cdmx?.summary).toMatch(/altitud/i);
		expect(cdmx?.tips.some((t) => /propina/i.test(t.title))).toBe(true);
	});

	it('devuelve null para id inválido', () => {
		expect(getCultureByDestinationId(data, 'no-existe')).toBeNull();
		expect(getCultureByDestinationId(data, null)).toBeNull();
	});
});

describe('buildCultureWidgetView', () => {
	const data = loadCultureData();

	it('expone resumen y consejos para Buenos Aires', () => {
		const ba = getCultureByDestinationId(data, 'buenos-aires');
		expect(ba).not.toBeNull();
		const view = buildCultureWidgetView(ba!);
		expect(view.summary).toMatch(/voseo/i);
		expect(view.tips.length).toBeGreaterThanOrEqual(3);
		expect(view.tips[0]).toMatchObject({
			title: expect.any(String),
			body: expect.any(String),
		});
	});

	it('agrupa fuente en sourceFooter', () => {
		const madrid = getCultureByDestinationId(data, 'madrid');
		const view = buildCultureWidgetView(madrid!);
		expect(view.sourceFooter.source).toBeTruthy();
		expect(view.sourceFooter.year).toBeGreaterThan(2000);
		expect(view.sourceFooter.sourceUrl).toMatch(/^https?:/);
	});
});
