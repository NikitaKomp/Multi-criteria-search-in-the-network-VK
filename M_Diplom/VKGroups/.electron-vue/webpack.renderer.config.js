'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const {dependencies} = require('../package.json')
const webpack = require('webpack')

const BabiliWebpackPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * List of node_modules to include in webpack bundle
 *
 * Required for specific packages like Vue UI libraries
 * that provide pure *.vue files that need compiling
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/webpack-configurations.html#white-listing-externals
 */
let whiteListedModules = ['vue']

let cssLoaders = [
  'vue-style-loader', // creates style nodes from JS strings,
  'css-loader', // translates CSS into CommonJS
  {
    loader: 'postcss-loader', // process and updates css with auto-prefixes
    options: {
      config: {
        path: path.resolve(__dirname, './postcss.config.js'),
      },
    },
  },
  'resolve-url-loader', // fixes sass uri resolve issue
]

let sassLoaders = JSON.parse(JSON.stringify(cssLoaders))
sassLoaders.push('sass-loader?sourceMap&indentedSyntax=1') // compiles Sass to CSS if need to

let vueSassLoaders = JSON.parse(JSON.stringify(sassLoaders))
vueSassLoaders.push({
  loader: 'sass-resources-loader', // main sass file to global scope
  options: {
    resources: [
      path.resolve(__dirname,
        '../src/renderer/assets/styles/main.sass'),
    ],
  },
})

let rendererConfig = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    renderer: path.join(__dirname, '../src/renderer/main.js'),
  },
  externals: [
    ...Object.keys(dependencies || {}).
      filter(d => !whiteListedModules.includes(d)),
  ],
  module: {
    rules: [
      {
        test: /\.s[ca]ss$/,
        use: sassLoaders,
      },
      {
        test: /\.css$/,
        use: cssLoaders,
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            extractCSS: process.env.NODE_ENV === 'production',
            postcss: [
              require('postcss')(),
            ],
            loaders: {
              sass: vueSassLoaders,
              scss: vueSassLoaders,
            },
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name]--[folder].[ext]',
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name]--[folder].[ext]',
        },
      },
      {
        test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name]--[folder].[ext]',
          },
        },
      },
    ],
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production',
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      nodeModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, '../node_modules')
        : false,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron'),
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/renderer'),
      'vue$': 'vue/dist/vue.esm.js',
    },
    extensions: ['.js', '.vue', '.json', '.css', '.scss', '.sass', '.node'],
  },
  target: 'electron-renderer',
}

/**
 * Adjust rendererConfig for development settings
 */
if (process.env.NODE_ENV !== 'production') {
  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../static').
        replace(/\\/g, '\\\\')}"`,
    }),
  )
}

/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new BabiliWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(__dirname, '../dist/electron/static'),
        ignore: ['.*'],
      },
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  )
}

module.exports = rendererConfig
