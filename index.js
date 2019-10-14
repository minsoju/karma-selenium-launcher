var webdriverio = require('webdriverio');
var env = process.env;

var buildOptions = function(args){
  var options = args.config, attr;

  for(attr in args){
    if(!options[attr]){
    options[attr] = args[attr];
    }
  }
  delete options['config'];
  delete options['base'];

  return options;
};

var SeleniumBrowser = function (baseBrowserDecorator, args, logger) {
  var options = buildOptions(args),
      log = logger.create('webdriverio'),
      self = this,
      pseudoActivityInterval = null,
      browserRunning = false;

  baseBrowserDecorator(this);

  this.name = 'selenium for ' + args.browserName;

  this._start = function (url) {
    log.info('Selenium browser started at http://' + options.host+ ':' + options.port + options.path);
    self.browser = webdriverio
      .remote(options)
      .init()
      .url(url)
      .then(function(){
        browserRunning = true;
        if (options.pseudoActivityInterval) {
          pseudoActivityInterval = setInterval(function() {
            self.browser.title();
          }, pseudoActivityInterval);
        }
      });
  };

  this.on('kill', function(done){
    if(!browserRunning){
      process.nextTick(done);
    }

    clearInterval(pseudoActivityInterval);

    self.browser
      .end()
      .then(function(){
        log.info('Browser closed');
        self._done();
        done();
      });
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
