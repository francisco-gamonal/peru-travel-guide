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
				chromeFlags: [
					'--no-sandbox',
					'--disable-dev-shm-usage',
					'--disable-gpu',
					'--headless=new',
				],
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
