const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

// "plugins": [["@babel/plugin-transform-runtime", {
//   "absoluteRuntime": false,
//   "corejs": 2,
//   "helpers": true,
//   "regenerator": true,
//   "useESModules": false,
//   "version": "7.0.0-beta.0"
// }]]

module.exports = {
  mode: 'development', // 打包模式（production：生产模式/development：开发模式）
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js', // 项目打包的入口文件
  },
  devServer: {
    contentBase: './dist', // 配置服务器根路径
    open: true, // 启动服务器时，自动打开浏览器并访问服务器地址
    port: 3000, // 设置服务器端口号
    hot: true, // 开启热模块更新
    hotOnly: true, // 热模块失效浏览器也不会自动刷新
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/, // 如果 js 文件在这个目录里，则不使用babel-loader
      loader: 'babel-loader'
    }, {
      test: /\.(jpg|png|gif)$/, // 结尾只要是其中的一种，都会使用 file-loader
      use: {
        loader: 'url-loader',
        options: {
          // placeholder 占位符
          name: '[name]_[hash].[ext]', // 配置打包后文件的名字(原名字+_对应哈希值)
          outputPath: 'images/', // 指定要放置目标文件的文件系统路径
          limit: 10240, // 小于10kb使用base64方式，大于则使用打包方式
        }
      }
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader'
      }
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, // css 文件里@import的也要走下面两个loader
            // modules: true, // 开启css模块化打包
          }
        },
        'sass-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    publicPath: '/',
    filename: '[name].js', // 打包后文件的名字
    path: path.resolve(__dirname, 'dist') // 打包后的文件放置的位置(必须是绝对位置)
  }
}