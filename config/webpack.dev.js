/* ============================
   DEVELOPMENT WEBPACK CONFIG
   ============================ */

import config from "./webpack.common.js";
import { merge } from "webpack-merge";
import path from "path";
import { fileURLToPath } from "url";
import * as sass from "sass";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(config, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../src"),
    },
    hot: true,
    compress: true,
    port: 3000,
    liveReload: true,
  },
  output: {
    filename: "script/[name]/[name].js",
    path: path.resolve(__dirname, "../dev"),
    publicPath: "",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {
                quietDeps: true,
              },
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
});
