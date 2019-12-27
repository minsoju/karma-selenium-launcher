var path = require('path');

module.exports = function(config) {

    var webDriverConfig = {
      capabilities: {
        version: '27.0'
      },
      hostname: 'localhost',
      port: 4444,
      path: '/wd/hub'
    };

  var customLaunchers = {
    selenium_chrome: {
      base: 'Selenium',
      config: webDriverConfig,
      name: 'Karma Test',
      browserName: 'chrome'
    }
  };

  config.set({
    basePath: '',
    files: [
      './test/*.spec.js'
    ],
    frameworks: ['jasmine'],
    singleRun: false,
    customLaunchers: customLaunchers,
    browsers: ['selenium_chrome'],
    plugins: [
      require('../index.js'),
      'karma-jasmine'
    ]
  });
}
