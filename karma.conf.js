
/* SAUCE LABS LAUNCHERS */

const isSauceLabs = process.argv.includes ( '--sauce' );

const SauceLabsLaunchers = {
  win_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10.0',
    platform: 'Windows 7'
  },
  win_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.0',
    platform: 'Windows 8.1'
  },
  win_edge_17: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '17.17134',
    platform: 'Windows 10'
  },
  win_chrome_60: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '60.0',
    platform: 'Windows 10'
  },
  win_firefox_50: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '50.0',
    platform: 'Windows 10'
  },
  linux_chrome_45: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '45.0',
    platform: 'Linux'
  },
  linux_firefox_45: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '45.0',
    platform: 'Linux'
  },
  mac_chrome_60: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: '60.0',
    platform: 'macOS 10.13'
  },
  mac_firefox_50: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '50.0',
    platform: 'macOS 10.13'
  },
  mac_safari_12: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: '12.0',
    platform: 'macOS 10.13'
  },
  ios_9: {
    base: 'SauceLabs',
    deviceName: 'iPhone 6 Simulator',
    browserName: 'Safari',
    platformVersion: '9.3',
    platformName: 'iOS'
  },
  ios_12: {
    base: 'SauceLabs',
    deviceName: 'iPhone XS Simulator',
    browserName: 'Safari',
    platformVersion: '12.0',
    platformName: 'iOS'
  },
  android_6: {
    base: 'SauceLabs',
    deviceName: 'Android Emulator',
    browserName: 'Chrome',
    platformVersion: '6.0',
    platformName: 'Android'
  }
};

/* CONFIG */

function config ( config ) {

  config.set ({
    frameworks: [
      'qunit'
    ],
    plugins: [
      'karma-qunit',
      'karma-chrome-launcher',
      'karma-sauce-launcher',
      'karma-spec-reporter'
    ],
    files: [
      'dist/cash.js',
      'test/index.js'
    ],
    browsers: isSauceLabs ? Object.keys ( SauceLabsLaunchers ) : ['Chrome'],
    customLaunchers: SauceLabsLaunchers,
    reporters: [
      'spec',
      'saucelabs'
    ],
    captureTimeout: 360000,
    browserNoActivityTimeout: 360000
  });

}

/* EXPORT */

module.exports = config;
