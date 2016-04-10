var { element } = require('deku');
var Baobab = require('baobab');
var type = Baobab.type;

module.exports = {
  // Render application at root level
  mount (app, Root) {
    var renderer = app.locator.resolve('documentRenderer');
    var tree = app.locator.resolve('tree');
    renderer(<Root />, { tree });
  },

  // High ordered function for binding baobab data to components
  branch (mapping, Component) {
    if (!type.watcherMapping(mapping)) {
      throw Error('deku.branch: invalid mapping.');
    }

    return {
      render (model) {
        var context = model.context || {};
        var tree = context.tree;

        if (!(tree instanceof Baobab))
          throw Error('deku.branch/render: could not find the tree in context.');

        var data = tree.project(mapping);

        var props = {
          ...data,
          ...model.props
        };

        return element(Component, props, model.children);
      }
    };
  },
  
  // Run signal from dispatcher, it's especially for component usage
  signal (dispatch, actions, args) {
    return () => {
      dispatch(actions, args);
    }
  }
};

