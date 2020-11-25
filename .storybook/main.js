const path = require('path')

module.exports = {
	reactOptions: {
    fastRefresh: true,
  },
  "stories": [
    "../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)",
		"../src/**/stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
		"@storybook/addon-essentials",
		'storybook-addon-themes',
	],
	typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
	webpackFinal: async (config) => {
		
		config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src")
    };

    return config;
  },
}
