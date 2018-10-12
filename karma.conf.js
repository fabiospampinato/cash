
/* SAUCE LABS LAUNCHERS */

const isSauceLabs = process.argv.includes ( '--sauce' );

const SauceLabsLaunchers = {
  sauce_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '10.0',
    platform: 'Windows 7'
  },
  sauce_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.103',
    platform: 'Windows 10'
  },
  sauce_edge_15: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '15.15063'
  },
  sauce_edge_17: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: '17.17134'
  },
  sauce_safari: {
    base: 'SauceLabs',
    browserName: 'Safari',
    version: '11.1',
    platform: 'macOS 10.13'
  },
  sauce_iphone: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone XS Simulator',
    platformName: 'iOS',
    platformVersion: '12.0'
  },
  sauce_android_kitkat: {
    base: 'SauceLabs',
    deviceName: 'Android Emulator',
    browserName: 'Browser',
    platformVersion: '4.4',
    platformName: 'Android'
  },
  sauce_android_marshmallow: {
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
