const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						cacheDirectory: false,
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								config: path.resolve(
									__dirname,
									"postcss.config.js"
								),
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "todoApp",
			filename: "remoteEntry.js",
			exposes: {
				"./TodoList": "./src/components/TodoList",
			},
			shared: ["react", "react-dom"],
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	],
	resolve: { extensions: [".js", ".jsx"] },
};
