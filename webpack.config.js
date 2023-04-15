const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		emus: "./emus/modules.js",
		main: "./public/index.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		library: {
			name: "demuyz",
			type: "umd"
		}
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			}
		]
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist")
		},
		compress: false,
		port: 9999
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Emulator Testpage",
			filename: "index.html",
			template: "./public/index.html"
		})
	],
	optimization: {
		minimize: false // TODO
	}
}