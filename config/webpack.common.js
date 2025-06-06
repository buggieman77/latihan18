/* ============================
   COMMON WEBPACK CONFIG
   ============================ */

import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    support: { import: "./src/script/support.js" },
    style: { import: "./src/script/style.js", dependOn: "support" },
    main: { import: "./src/script/index.js", dependOn: "support" },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
      publicPath: "",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    ie: "11", // Tambah ini agar mendukung IE11
                  },
                  useBuiltIns: "usage", // Tambahkan polyfill hanya yang digunakan
                  corejs: "3.36", // Versi core-js terbaru (pastikan sudah diinstal)
                  debug: false, // true jika ingin lihat log transpile saat build
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
