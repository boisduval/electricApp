'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.ios.js', '.android.js', '.js', '.json'],
    alias: {
      assets: resolve('src/assets'),
      utils: resolve('src/assets/utils'),
      src: resolve('src'),
      styles: resolve('src/assets/styles'),
      components: resolve('src/components'),
      views: resolve('src/views'),
      locales: resolve('locales'),
      RootNavigation: resolve('RootNavigation')
    },
  },
};
