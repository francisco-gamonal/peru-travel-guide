import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const distRoot = resolve(process.cwd(), 'dist');

function readDistHtml(segment: string): string {
	const filePath = resolve(distRoot, segment, 'index.html');
	if (!existsSync(filePath)) {
		throw new Error(
			`Falta ${filePath}. Ejecuta pnpm build antes de las pruebas estáticas.`,
		);
	}
	return readFileSync(filePath, 'utf-8');
}

describe('páginas estáticas de destinos (post-build)', () => {
	// @spec DV-03
	it('cabecera con bandera: alt en español y dimensiones fijas', () => {
		const html = readDistHtml('destino/london');
		expect(html).toContain('Bandera de Reino Unido');
		expect(html).toMatch(/width="32"/);
		expect(html).toMatch(/height="24"/);
	});

	// @spec DV-04
	it('Madrid en /destino/madrid/ con banderas en selector', () => {
		const html = readDistHtml('destino/madrid');
		expect(html).toContain('Madrid');
		expect(html).toContain('Clima y mejores épocas');
		expect(html).toContain('continental mediterráneo');
		expect(html).toContain('Cultura y consejos prácticos');
		expect(html).toContain('sobremesa');
		expect(html).toMatch(/cultura/i);
		expect(html).toContain('Por país');
		expect(html).toContain('Por ciudad');
		expect(html).not.toContain('Próximamente: cultura');
		expect(html).toContain('Bandera de España');
		expect(html).toMatch(/role="listbox"/);
	});

	// @spec DV-08
	it('comparación poblacional incluye bandera de Perú', () => {
		const html = readDistHtml('destino/madrid');
		expect(html).toContain('Bandera del Perú');
	});

	it('Ciudad de México en /destino/cdmx/ (regresión static output)', () => {
		const html = readDistHtml('destino/cdmx');
		expect(html).toContain('Ciudad de México, México');
		expect(html).toMatch(/<h2[^>]*>[\s\S]*Ciudad de México, México/);
		expect(html).not.toMatch(/<h2[^>]*>\s*Madrid, España\s*</);
		expect(html).toContain('temporada de lluvias');
		expect(html).not.toContain('continental mediterráneo');
		expect(html).toContain('Propina y consumo');
		expect(html).not.toContain('sobremesa');
	});

	it('Buenos Aires en /destino/buenos-aires/', () => {
		const html = readDistHtml('destino/buenos-aires');
		expect(html).toContain('Buenos Aires');
		expect(html).toContain('voseo');
	});

	// @spec PC-15
	it('Londres en /destino/london/', () => {
		const html = readDistHtml('destino/london');
		expect(html).toContain('Londres');
		expect(html).toContain('Reino Unido');
		expect(html).toContain('clima oceánico');
		expect(html).toContain('Oyster');
		expect(html).not.toContain('Próximamente: cultura');
		expect(html).toContain('Bandera de Reino Unido');
	});
});
