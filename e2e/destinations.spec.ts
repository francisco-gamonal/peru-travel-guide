import { expect, test } from '@playwright/test';

const destinations = [
	{ id: 'madrid', city: 'Madrid' },
	{ id: 'cdmx', city: 'Ciudad de México' },
	{ id: 'buenos-aires', city: 'Buenos Aires' },
] as const;

for (const { id, city } of destinations) {
	test(`destino ${id} muestra ${city} en la comparación`, async ({ page }) => {
		await page.goto(`/destino/${id}/`);
		await expect(page.getByRole('heading', { level: 2 })).toContainText(city);
		await expect(page.locator('body')).toContainText(city);
		if (id === 'cdmx') {
			await expect(page.getByRole('heading', { level: 2 })).not.toHaveText(/^Madrid/);
		}
	});
}

test('raíz redirige a un destino con comparación', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL(/\/destino\/[^/]+\//);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('destino');
});

test('regresión: CDMX no muestra el encabezado de Madrid', async ({ page }) => {
	await page.goto('/destino/cdmx/');
	await expect(page.getByRole('heading', { level: 2 })).toHaveText(/Ciudad de México/);
	await expect(page.getByRole('heading', { level: 2 })).not.toHaveText(/^Madrid/);
});
