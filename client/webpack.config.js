const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const VueLoader = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {IS_PROD} = require('../server/config')
 
const webpackConfig = {
  mode: IS_PROD ? 'production' : 'development',
  entry: {
    main: [path.join(__dirname, "main.ts")]
  },
  output: {
    path: path.join(__dirname, '../server/build/public'),
    filename: '[name].[hash:8].js',
    publicPath: "/"
  },
  devtool: IS_PROD ? 'source-map' : 'inline-source-map',
  resolve: {
    extensions: [".ts", ".js", ".vue", ".css"],
    alias: {
        vue$: 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      // {
      //     test: /\.js?$/,
      //     loader: 'babel-loader',
      //     exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      // },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
          test: /\.less$/,
          use: [IS_PROD ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  plugins: [
    // 处理 .vue
    new VueLoader(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html")
    })
  ]
};


if (IS_PROD) {
  webpackConfig.plugins.push(
      // 每次 build 清空 output 目录
      new CleanWebpackPlugin()
  )
  webpackConfig.plugins.push(
      // 分离单独的 CSS 文件到 output
      new MiniCssExtractPlugin({
          filename: 'style.css'
      })
  )
}

module.exports = webpackConfig
