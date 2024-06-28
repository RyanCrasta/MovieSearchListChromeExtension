const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const PAGES_PATH = "./src/pages";

function generateHtmlPlugins(items) {
    return items.map(
      (name) =>
        new HtmlPlugin({
          filename: `./${name}.html`,
          chunks: [name],
        })
    );
}

module.exports = {
  entry: {
    popup: `${PAGES_PATH}/popup`,
    background:  `${PAGES_PATH}/background`,
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader", // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [tailwindcss, autoprefixer],
              },
            },
          },
        ],
      },
      {
        type: "assets/resource",
        test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...generateHtmlPlugins(["background", "popup"]),
  ],
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
  },
  output: {
    path: path.resolve("dist/"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
