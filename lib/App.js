var ServiceLocator = require('catberry-locator');

// Basic application with service locator
class App {
  constructor () {
    this.locator = new ServiceLocator();
    this.locator.registerInstance('serviceLocator', this.locator);
    this.locator.registerInstance('app', this);
  }
  
  start () {
    return new Promise(resolve => {
      window.document.addEventListener('DOMContentLoaded', () => {
        resolve(this);
      });
    });
  }
}

module.exports = App;
