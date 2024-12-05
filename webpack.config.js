const path = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  entry: "./src/puzzle-solver.ts",

  externals: [nodeExternals()],
  output: {
    filename: "puzzle-solver.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
    extensionAlias: {
      ".ts": [".js", ".ts"],
      ".cts": [".cjs", ".cts"],
      ".mts": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      {
        test: /ts$/,
        loader: "ts-loader",
      },
    ],
  },
};
