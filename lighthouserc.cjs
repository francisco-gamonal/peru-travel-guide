const { THRESHOLDS, previewUrls } = require('./scripts/lighthouse-budget.cjs');

/** @type {import('@lhci/cli').LHCI.ServerCommand.Options} */
module.exports = {
	ci: {
		collect: {
			startServerCommand: 'pnpm exec astro preview --host 127.0.0.1 --port 4321',
			startServerReadyPattern: 'Local',
			url: previewUrls(),
			numberOfRuns: 1,
			settings: {
				// LHCI concatena arrays con comas (flags inválidos); usar string con espacios.
				chromeFlags:
					'--no-sandbox --disable-setuid-sandbox --disable-dev-shm-usage --disable-gpu',
			},
		},
		assert: {
			assertions: {
				'largest-contentful-paint': [
					'error',
					{ maxNumericValue: THRESHOLDS.lcpMs },
				],
				'cumulative-layout-shift': [
					'error',
					{ maxNumericValue: THRESHOLDS.cls },
				],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
