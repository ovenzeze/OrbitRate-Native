const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	// Configure PostCSS and Tailwind CSS support
	webpack.chainWebpack(config => {
		// Add PostCSS loader for CSS processing
		config.module
			.rule('css')
			.test(/\.css$/)
			.use('postcss-loader')
			.loader('postcss-loader')
			.options({
				postcssOptions: {
					plugins: [
						require('tailwindcss'),
						require('autoprefixer')
					]
				}
			});

		// Add SCSS support
		config.module
			.rule('scss')
			.test(/\.scss$/)
			.use('sass-loader')
			.loader('sass-loader')
			.options({
				implementation: require('sass'),
				sassOptions: {
					api: 'modern-compiler' // 使用现代编译器 API
				}
			});

		return config;
	});

	return webpack.resolveConfig();
};