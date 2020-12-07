const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	reactOptions: {
		fastRefresh: true,
	},
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../src/**/stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-addon-themes',
	],
	
	// ! Workaround for new React jsx runtime incompatibilities
	// ! Taken from Storybook issue workaround
	// ! See: https://github.com/storybookjs/storybook/issues/12952#issuecomment-719871776
	// ! See https://github.com/storybookjs/storybook/issues/12952#issuecomment-733987636
  babel: async (options) => ({
    ...options,
    plugins: [...options.plugins, '@babel/plugin-transform-react-jsx'],
	}),
	
	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
		},
	},
	webpackFinal: async config => {
		config.resolve.plugins.push(new TSConfigPathsPlugin());
    return config;
	},
}
