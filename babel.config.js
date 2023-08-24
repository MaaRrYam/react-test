module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@screens': './src/screens',
            '@components': './src/components/index',
            '@hooks': './src/hooks/index',
            '@/constants': './src/constants/index',
            '@utils': './src/utils',
            '@assets': '/src/assets',
            '@interfaces': '/src/interfaces/index.ts',
            '@styles': '/src/styles/',
          },
        },
      ],
    ],
  };
};
