module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@images": "./assets/images",
            "@components": "./components",
            "@constants": "./constants",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
