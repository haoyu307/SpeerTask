module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', '.android.js', '.ios.js'],
        root: ['.'],
        alias: {
          '@image': './src/assets/image',
          '@svg': './src/assets/svg',
          '@container': './src/components/container',
          '@pure': './src/components/pure',
          '@screen': './src/screens',
          '@service': './src/services',
          '@util': './src/utils',
          '@store': './src/store',
        },
      },
    ],
  ],
};
