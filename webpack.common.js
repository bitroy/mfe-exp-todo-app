const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const pkg = require("./package.json");

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
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "todoApp",
			filename: "remoteEntry.js",
			exposes: {
				"./TodoList": "./src/components/TodoList",
			},
			shared: {
				react: {
					singleton: true,
					requiredVersion: pkg.dependencies["react"],
				},
				"react-dom": {
					singleton: true,
					requiredVersion: pkg.dependencies["react-dom"],
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	],
	resolve: {
		extensions: [".js", ".jsx"],
	},
};
