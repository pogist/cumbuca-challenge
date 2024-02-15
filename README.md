## Getting Started

### Running the project
```sh
yarn # Install dependencies
yarn expo prebuild # This will install native dependencies (.e.g. Cocoapods on iOS)
yarn start # Start React Native/Expo packager
yarn ios # Build and run on iOS
yarn android # Build and run on Android
```

### Running tests

```sh
yarn test # Run unit tests with jest
```

```sh
yarn detox:build:ios # Build Detox iOS application
yarn detox:build:android # Build Detox Android application

yarn detox:ios # Run e2e tests on iOS (make sure to setup your device/simulator on .detoxrc.js)
yarn detox:android # Run e2e tests on Android (make sure to setup your device/emulator on .detoxrc.js)
```

### Troubleshooting

#### Cocoapods install fails (iOS)

- Make sure you're using a version of cocoapods `>=14` and `<15`.
  - Latest versions of React Native don't support cocoapods 15+

#### Build fails during Hermes build phase when running `yarn ios` (iOS)

Run `command -v node` on your terminal and copy the result. Then, inside `ios/.xcode.env.local`, replace the value of `export NODE_BINARY=...` with it.

For some reason, Hermes points to a `node` binary inside a weird cache/temp directory that's only accessible through Xcode, apparently.
So if you're building with `yarn ios`, then you'll need to manually edit this file and point to a `node` binary available on your system.
