module.exports = function (config) {
  config.set({
    frameworks: ['qunit'],
    plugins: [
      'karma-qunit',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    files: [
      'dist/cash.js',
      'test/index.js'
    ],
    browsers: [
      'Chrome'
    ],
    reporters: ['spec']
  })
}
