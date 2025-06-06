/* ============================
   PRODUCTION WEBPACK CONFIG
   ============================ */

import config from "./webpack.common.js";
import { merge } from "webpack-merge";
import path from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import { PurgeCSSPlugin } from "purgecss-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

// Konversi __dirname (karena tidak tersedia di ES6 module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATHS = {
  src: path.join(__dirname, "../src"),
};

export default merge(config, {
  mode: "production",
  output: {
    filename: "script/[name]/[name]-[chunkhash].js",
    path: path.resolve(__dirname, "../public"),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      safelist: () => true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name]-[contenthash][ext]",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                quietDeps: true,
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
});

const scanned = glob.sync(`${PATHS.src}/**/*.{html,js}`, { nodir: true });
console.log("Files scanned by PurgeCSS:", scanned);
