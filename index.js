var bootstrapper = require('./lib/Bootstrapper');
var config = Object.create(null);
var uhr = require('catberry-uhr');
var { mount } = require('./utils');
var Root = require('./components/Counter');

// Create app instance with Baobab tree and renderer inside.
// Also we register some useful services inside like eventBus
var app = bootstrapper.create(config, document.body);

// Add custom services like UHR library
uhr.register(app.locator);

// Wait until DOM will be ready
app.start()
  .then((app) => {
    // You can extend app logic like routing here.
    var tree = app.locator.resolve('tree');
    tree.on('update', () => mount(app, Root));
    mount(app, Root);
  });

// Hot Module Replacement
if (module.hot) {
  module.hot.accept('./components/Counter', function () {
    Root = require('./components/Counter');
    mount(app, Root);
  });
}
