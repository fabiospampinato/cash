
/* SAUCE LABS LAUNCHERS */

const isSauceLabs = process.argv.includes ( '--sauce' );
const generateCoverage = process.argv.includes ( '--generate-coverage' );

const SauceLabsLaunchers = {
  win_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    version: '11.0',
    platform: 'Windows 8.1'
  },
  win_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    version: 'latest',
    platform: 'Windows 10'
  },
  win_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-5',
    platform: 'Windows 10'
  },
  win_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-5',
    platform: 'Windows 10'
  },
  linux_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'Linux'
  },
  linux_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'Linux'
  },
  mac_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-5',
    platform: 'macOS 10.13'
  },
  mac_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-5',
    platform: 'macOS 10.13'
  },
  mac_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    version: 'latest',
    platform: 'macOS 10.13'
  },
  ios_11: {
    base: 'SauceLabs',
    deviceName: 'iPhone 6 Simulator',
    browserName: 'Safari',
    platformVersion: '11.0',
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

const plugins = [
  'karma-qunit',
  'karma-chrome-launcher',
  'karma-firefox-launcher',
  'karma-sauce-launcher',
  'karma-spec-reporter'
];
const preprocessors = {};
const reporters = ['spec', 'saucelabs'];

if (generateCoverage) {
  plugins.push('karma-coverage');
  preprocessors['dist/*.js'] = ['coverage'];
  reporters.push('coverage');
}

/* CONFIG */

function config ( config ) {

  config.set ({
    frameworks: [
      'qunit'
    ],
    plugins,
    files: [
      'node_modules/qunit-ava-spec/dist/index.js',
      'dist/cash.js',
      'test/helpers.js',
      'test/modules/attributes.js',
      'test/modules/collection.js',
      'test/modules/core.js',
      'test/modules/css.js',
      'test/modules/data.js',
      'test/modules/dimensions.js',
      'test/modules/effects.js',
      'test/modules/events.js',
      'test/modules/forms.js',
      'test/modules/manipulation.js',
      'test/modules/offset.js',
      'test/modules/traversal.js',
      'test/modules/utilities.js'
    ],
    browsers: isSauceLabs ? Object.keys ( SauceLabsLaunchers ) : ['Chrome', 'Firefox'],
    customLaunchers: SauceLabsLaunchers,
    preprocessors,
    reporters,
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'lcov', subdir: '.' }
      ]
    },
    captureTimeout: 360000,
    browserNoActivityTimeout: 360000
  });

}

/* EXPORT */

module.exports = config;
