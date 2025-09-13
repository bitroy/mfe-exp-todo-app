const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
	mode: "production",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		splitChunks: { chunks: "all" },
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js",
		publicPath: "auto",
	},
	plugins: [new CleanWebpackPlugin()],
});
