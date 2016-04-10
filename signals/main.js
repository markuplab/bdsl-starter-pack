// Signal definitions
module.exports = {
  increment: [
    increment
  ],
  decrement: [
    decrement
  ]
};

// Actions
function decrement (args, state) {
  var current = state.get(['counter']) || 0;
  state.set(['counter'], current - 10);
}

function increment (args, state) {
  var current = state.get(['counter']) || 0;
  state.set(['counter'], current + 10);
}
