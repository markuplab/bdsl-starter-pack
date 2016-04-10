var { element } = require('deku');
var { branch, signal } = require('../utils');
var { decrement, increment} = require('../signals/main');

module.exports = branch({ counter: ['counter'] }, ({ props, dispatch }) => {
  var counter = props.counter || 0;

  return (
    <div>
      <div>Counter now { counter }</div>
      <button onClick={signal(dispatch, increment)}>Increment</button>
      <button onClick={signal(dispatch, decrement)}>Decrement</button>
    </div>
  )
});
