const { remote } = require('webdriverio');
var env = process.env;

var SeleniumBrowser = function (baseBrowserDecorator, args, logger) {
  var log = logger.create('webdriverio'),
      self = this;

  baseBrowserDecorator(this);

  this.name = 'selenium for ' + args.browserName;

  this._start = function(url) {
    log.info('Selenium browser started at http://' + args.config.hostname + ':' + args.config.port + args.config.path);
    remote(args.config).then(browser => {
      self.browser = browser;
      browser.url(url);
    }).catch(e => {
      log.info('Error retrieving a selenium instance: ', e.message);
    });
  };

  this.on('kill', async function(done){
    if(!self.browser){
      process.nextTick(done);
      return;
    }

    try {
      await self.browser.deleteSession();
      log.info('Browser closed');
    } catch (error) {
      log.error('Browser closed with error:\n' + error.message + '\n' + error.stack);
    }
    self._done();
    done();
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
