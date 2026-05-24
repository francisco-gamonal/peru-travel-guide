import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const destinations = [
	{ id: 'madrid', city: 'Madrid' },
	{ id: 'cdmx', city: 'Ciudad de México' },
	{ id: 'buenos-aires', city: 'Buenos Aires' },
] as const;

function comparisonHeading(page: Page) {
	return page.locator('#comparison-heading');
}

for (const { id, city } of destinations) {
	test(`destino ${id} muestra ${city} en la comparación`, async ({ page }) => {
		await page.goto(`/destino/${id}/`);
		await expect(page.getByText('Por país')).toBeVisible();
		await expect(page.getByText('Por ciudad')).toBeVisible();
		await expect(comparisonHeading(page)).toContainText(city);
		await expect(page.locator('body')).toContainText(city);
		if (id === 'cdmx') {
			await expect(comparisonHeading(page)).not.toHaveText(/^Madrid/);
		}
	});
}

test('raíz redirige a un destino con comparación', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/destino\/[^/]+\//);
	await expect(page.getByRole('heading', { level: 1 })).toContainText(/guía para/i);
	await expect(comparisonHeading(page)).toBeVisible();
});

test('regresión: CDMX no muestra el encabezado de Madrid', async ({ page }) => {
	await page.goto('/destino/cdmx/');
	await expect(comparisonHeading(page)).toHaveText(/Ciudad de México/);
	await expect(comparisonHeading(page)).not.toHaveText(/^Madrid/);
});

for (const { id, snippet } of [
	{ id: 'madrid', snippet: /continental mediterráneo/i },
	{ id: 'cdmx', snippet: /temporada de lluvias/i },
	{ id: 'buenos-aires', snippet: /Río de la Plata/i },
] as const) {
	test(`destino ${id} muestra clima y mejores épocas`, async ({ page }) => {
		await page.goto(`/destino/${id}/`);
		await expect(page.getByRole('heading', { name: 'Clima y mejores épocas' })).toBeVisible();
		const climateSection = page.locator('section[aria-labelledby="climate-heading"]');
		await expect(climateSection).toContainText(snippet);
	});
}

test('selector navega al cambiar destino sin botón Comparar', async ({ page }) => {
	await page.goto('/destino/madrid/');
	await expect(page.getByRole('button', { name: 'Comparar' })).toHaveCount(0);

	await page.selectOption('#destination', 'cdmx');
	await expect(page).toHaveURL(/\/destino\/cdmx\//);
	await expect(comparisonHeading(page)).toHaveText(/Ciudad de México/);
});

test('selector actualiza el bloque climático al cambiar destino', async ({ page }) => {
	await page.goto('/destino/madrid/');
	const climateSection = page.locator('section[aria-labelledby="climate-heading"]');
	await expect(climateSection).toContainText(/continental mediterráneo/i);

	await page.selectOption('#destination', 'cdmx');
	await expect(page).toHaveURL(/\/destino\/cdmx\//);
	await expect(climateSection).toContainText(/temporada de lluvias/i);
	await expect(climateSection).not.toContainText(/continental mediterráneo/i);
});
