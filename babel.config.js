module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
          alias: {
            assets: './src/assets',
            utils: './src/assets/utils',
            src: './src',
            styles: './src/assets/styles',
            components: './src/components',
            views: './src/views',
            locales: './locales',
            RootNavigation: './RootNavigation',
          },
        },
      ],
    ],
  };
};
