const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // "production"
  mode: "development",
  entry: {
    equal: {
      import: path.join(__dirname, "../equal/equal.ts"),
      library: {
        name: "equal",
        type: "var"
      }
    },
    editor: {
      import: path.join(__dirname, "./cm-editor.js"),
      library: {
        name: "editor",
        type: "var"
      }
    },
    load: {
      import: path.join(__dirname, "./load.js"),
      dependOn: "equal"
    },

  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../../docs"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css"],    
    fallback: {
      "fs": false
    },
  },
  module: {
    rules: [
      { 
        test: /\.ts$/, 
        loader: "ts-loader", 
        exclude: /node_modules/,
        options: {
          configFile: path.join(__dirname, "../../tsconfig.json")
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "./template.html"),
      })
  ]
}



  
