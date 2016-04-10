var App = require('./App');
var Dispatcher = require('./Dispatcher');
var EventEmitter = require('events').EventEmitter;
var Baobab = require('baobab');
var { createApp } = require('deku');

class Bootstrapper {
  // Create app instance attached to some real DOM node
  create (config = {}, rootEl) {
    var app = new App();
    this.configure(config, app.locator, rootEl);
    return app;
  }

  // Register core services
  configure (config, locator, rootEl) {
    var eventBus = new EventEmitter();
    var tree = new Baobab({}, config.baobab);
    
    eventBus.setMaxListeners(0);
    locator.registerInstance('eventBus', eventBus);
    locator.registerInstance('config', config);
    locator.registerInstance('tree', tree);
    locator.register('dispatcher', Dispatcher, config, true);

    var dispatcher = locator.resolve('dispatcher');
    var documentRenderer = createApp(rootEl, dispatcher.run.bind(dispatcher));
    locator.registerInstance('documentRenderer', documentRenderer);
  }
}

module.exports = new Bootstrapper();
