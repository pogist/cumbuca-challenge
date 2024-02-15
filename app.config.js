const withNoAPSEntitlement = require('./config-plugins/withNoAPSEntitlement');

module.exports = withNoAPSEntitlement({
  name: 'cumbuca-challenge',
  slug: 'cumbuca-challenge',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'cumbucachallenge',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'io.github.pogist.CumbucaChallenge',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'io.github.pogist.cumbucachallenge',
  },
  plugins: [
    [
      'expo-build-properties',
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    [
      'expo-local-authentication',
      {
        faceIDPermission: 'Allow $(PRODUCT_NAME) to use Face ID.',
      },
    ],
    'expo-router',
  ],
  experiments: {
    typedRoutes: true,
  },
});
