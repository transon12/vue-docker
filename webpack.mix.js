const path = require('path');
const mix = require('laravel-mix');
const webpack = require('webpack');
require('laravel-mix-polyfill');
const CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
let API_BASE_URL = undefined;
switch (process.env.APP_ENV) {
  case 'development':
    API_BASE_URL = 'https://v2db.local/api/outside';
    break;
  case 'd2021':
    API_BASE_URL = 'https://d2021-api-v2.jprep.jp/api/outside';
    break;
  case 'production':
    API_BASE_URL = 'https://v2db.local/api/outside';
    break;
}

mix
  .setPublicPath('public')
  .setResourceRoot('../')
  .webpackConfig({
    output: {
      chunkFilename: 'js/chunks/[name].[contenthash].js',
    },
    plugins: [
      new CleanObsoleteChunks(),
      // new HtmlWebpackPlugin({
      //     inject: false,
      //     templateParameters: {
      //         hash: Math.random().toString(36).substring(7)
      //     },
      //     template: 'index.ejs',
      //     filename: 'index.html'
      // }),
      new webpack.DefinePlugin({
        API_BASE_URL: JSON.stringify(API_BASE_URL),
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: 'exports-loader?Util!bootstrap/js/dist/util',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      }),
    ],
    resolve: {
      alias: {
        // vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      },
      extensions: ['*', '.js', '.vue', '.json'],
    },
  })

  .js('src/main.js', './public/js')
  .vue({
    extractStyles: true,
    version: 2,
  })
  .sass('src/assets/sass/style.scss', './public/css')

  .copy('src/assets/images', './public/images')
  .sourceMaps()

  .polyfill({
    enabled: true,
    useBuiltIns: 'usage',
    targets: {
      ie: 11,
      firefox: 50,
    },
  });
