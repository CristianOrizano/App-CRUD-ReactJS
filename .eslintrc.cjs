module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		/*add */
		'prettier',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'all',
				ignoreRestSiblings: false,
				argsIgnorePattern: '^_$',
			},
		], // Advierte sobre variables no usadas
		'@typescript-eslint/no-explicit-any': 'warn',
		//'no-console': 'warn', // Advierte sobre el uso de console.log
	},
};
