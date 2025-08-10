const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
	mode: "development",
	devServer: {
		port: 3001,
		hot: true,
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	},
	devtool: "eval-source-map",
});
