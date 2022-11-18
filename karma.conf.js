
/* MAIN */

const config = config => {

  const obj = {
    frameworks: [
      'qunit'
    ],
    plugins: [
      'karma-qunit',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-spec-reporter'
    ],
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
    browsers: [
      'Chrome',
      'Firefox'
    ],
    reporters: [
      'spec'
    ],
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'html',
          subdir: '.'
        },
        {
          type: 'lcov',
          subdir: '.'
        }
      ]
    }
  };

  if ( process.argv.includes ( '--generate-coverage' ) ) {

    obj.browsers.pop ();
    obj.plugins.push ( 'karma-coverage' );
    obj.preprocessors = { 'dist/cash.js': ['coverage'] };
    obj.reporters.push ( 'coverage' );

  }

  config.set ( obj );

};

/* EXPORT */

module.exports = config;
