import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	...eslintPluginAstro.configs.recommended,
	{
		ignores: ['dist/', '.astro/', 'node_modules/', 'openspec/', 'specs/'],
	},
);
