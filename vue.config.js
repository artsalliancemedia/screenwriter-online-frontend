const path = require('path');
const Dotenv = require('dotenv-webpack');
const packages = require('./package.json');

const resolve = dir => path.join(__dirname, dir);

const chainWebpack = config => {
  config.resolve.extensions
    .merge(['.js', '.vue'])
    .end()
    .alias.set('@', resolve('src'));
  config.plugin('define').tap(args => {
    args[0]['process.env'].VUE_APP_VERSION = JSON.stringify(packages.version);
    return args;
  });
};

const configureWebpack = {
  plugins: [new Dotenv({ systemvars: true })],
};

const devServer = {
  port: 8080,
  proxy: {
    '/ws/*': {
      target: 'ws://localhost:8888',
      ws: true,
    },
  },
};

module.exports = {
  assetsDir: 'assets',
  devServer,
  productionSourceMap: false,
  configureWebpack,
  chainWebpack,
  transpileDependencies: ['vuetify'],
  css: {
    requireModuleExtension: true,
  },
  // pwa: {
  //   name: 'ScreenWriter 3.0',
  //   themeColor: '#029faf',
  //   workboxOptions: {
  //     skipWaiting: true,
  //     clientsClaim: true,
  //   },
  // }
};
