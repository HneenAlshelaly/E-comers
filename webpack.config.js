
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  cache: false,
  entry: {
    app: './src/index.js'
  },
  output: {

    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  devServer: {
    watchFiles: ["src/*.html"],
    hot: false,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    // compress: true,
    port: 9000,

    devMiddleware: {
      writeToDisk: true,
    }
  },

  module: {
    rules: [
      // the rolader should be in order to work it read it from rtl btu
      {
        test: /\.html$/i,
        loader: "html-loader",

        options: {
          minimize: true,
        },

      },

      {
        test: /\.css$/i,
        exclude: /bootstrap\.min\.css$/i,
        use: [

          {
            // do it in this way so it does not deal with css code as js (no need to import or export comand since css not js )
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          "css-loader"],
      },
      {
        test: /bootstrap\.min\.css$/i,
        use:[
          {
            // do it in this way so it does not deal with css code as js (no need to import or export comand since css not js )
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            }
          },
          "rtlcss-loader"
        ]

      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './images/[name][ext]'
        }
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: "./fonts/[name][ext]"
        }
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'

    }),
    new CssMinimizerPlugin()
  ],

};