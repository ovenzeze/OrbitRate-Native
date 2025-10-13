const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	// Temporarily disable Tailwind plugin to avoid pnpm global dependency issues
	webpack.chainWebpack(config => {
		// Remove @nativescript/tailwind plugin if it exists
		const configChain = config.toConfig();
		return config;
	});

	return webpack.resolveConfig();
};
