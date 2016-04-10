var appstate = require('appstate');

class Dispatcher {
  constructor (locator) {
    this._locator = locator;
  }

  // Signal runner, more about signals you can read here - https://github.com/markuplab/appstate
  // Now we create signal on every run, later maybe rework it
  run (actions = [], args) {
    var tree = this._locator.resolve('tree');
    var signal = appstate.create('DISPATCHER_SIGNAL', actions);
    return signal(tree, { locator: this._locator }, args);
  }
}

module.exports = Dispatcher;
