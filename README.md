# karma-selenium-launcher

> Launcher for selenium webdriver

## Installation

```shell
npm install karma-selenium-launcher --save-dev
```

## Configuration

```js
//karma.conf.js
module.exports = function(config){
  var webDriverConfig = {
    desiredCapabilities: {
      //capabilities of driver
    },
    host: 'localhost',
    port: 4444,
    path: '/wd/hub',
    //next is optional
    pseudoActivityInterval: 10000, // interval in ms to imitate activity
  };

  config.set({
    customLaunchers: {
      selenium_chrome: {
        base: 'Selenium',
        config: webDriverConfig,
        name: 'Karma Test',
        browserName: 'chrome'
      }
    },
    browsers: ['selenium_chrome']
  });
}
```
Refer to [webdriverio](http://webdriver.io/guide/getstarted/configuration.html) config documentation as well as [selenium's](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) for desiredCapabilities.
