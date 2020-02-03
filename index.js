const { remote } = require('webdriverio');
var env = process.env;

var SeleniumBrowser = function (baseBrowserDecorator, args, logger) {
  var log = logger.create('webdriverio'),
      self = this;

  baseBrowserDecorator(this);

  this.name = 'selenium for ' + args.browserName;
  this.navigated = false;

  this._start = function(url) {
    log.info('Selenium browser started at http://' + args.config.hostname + ':' + args.config.port + args.config.path);
    remote(args.config).then(browser => {
      self.browser = browser;
      return browser.url(url);
    }).then(() => {
      self.navigated = true;
      log.info(self.name + ' navigated to the Karma URL');
    }).catch(e => {
      self.navigated = true;
      log.info('Error retrieving a selenium instance: ', e.message);
    });
  };

  this.on('kill', function(done) {
    if(!self.browser){
      process.nextTick(done);
      return;
    }

    // need to delay the end request in case the navigation request has not completed yet
    const delayedEnd = () => {
      if (self.navigated) {
        self.browser.deleteSession().then(() => {
          log.info('Browser closed');
          self._done();
          done();
        }).catch((error) => {
          log.error('Browser closed with error:\n' + error.message + '\n' + error.stack);
          self._done();
          done();
        });
      } else {
        setTimeout(delayedEnd, 100);
      }
    };
    delayedEnd();
  });
};

SeleniumBrowser.prototype = {
  name: 'Selenium',
  DEFAULT_CMD: {
    linux: require('webdriverio').path,
    darwin: require('webdriverio').path,
    win32: require('webdriverio').path
  }
};

SeleniumBrowser.$inject = ['baseBrowserDecorator', 'args', 'logger'];

module.exports = {
  'launcher:Selenium': ['type', SeleniumBrowser]
};
