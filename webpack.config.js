const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/equal-zero/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "builds/gui"),
    clean: true
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { 
          presets: ["@babel/preset-react"],
          plugins: [
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }

    ]
  },
  resolve: {
    extensions: ["*", ".js", "jsx"]
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/equal-zero/template.html"
  })]
}