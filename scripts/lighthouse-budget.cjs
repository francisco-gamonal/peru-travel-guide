/** Umbrales y rutas compartidos entre `lighthouserc.cjs` y tests (PB-01, PB-02). */
const ASTRO_BASE = '/peru-travel-guide/';

const THRESHOLDS = {
	lcpMs: 2500,
	cls: 0.1,
	inpMs: 200,
};

const ROUTE_PATHS = ['', 'destino/london/'];

function previewUrls(host = '127.0.0.1', port = 4321) {
	const origin = `http://${host}:${port}`;
	return ROUTE_PATHS.map((segment) => {
		const path = `${ASTRO_BASE}${segment}`.replace(/\/{2,}/g, '/');
		return `${origin}${path}`;
	});
}

module.exports = {
	ASTRO_BASE,
	THRESHOLDS,
	ROUTE_PATHS,
	previewUrls,
};
