# BDSL Starter Pack (Baobab, Deku, Signals, Locator) 

Deku is beautiful functional view library, that created especially for stateless components and state containers.
Many peoples well know Redux, and Deku recommend use it as container, but this starter pack use baobab and signals as container.

[Difference between signals and redux/flux](http://www.christianalfoni.com/articles/2015_11_16_Flux-vs-Single-State-Tree)

## Signals

Signals it's conception about control async/sync/parallel data flow.
It's use simple "pseudo-DSL" language for composing simple functions that mutate state.

Signal example:

```
[
  loader.setLoader, // Here you want sync mutation like tree.set('loading', 'true')
 [ // Start of async operation, previous mutation will be updated in tree
    {
      api.getData, { // Here we request data from async source and run success/error output function with results: output.success({ data: data})
         success: [
           loader.removeLoader, // Sync operation
           data.setData // Sync operation based on result from previous function
         ],
         error: [
           loader.removeLoader, 
           error.setError
         ]
      }
    },
    ... // you can add more request here, it's will be work like Promise.all, but outputs actions don't wait when end all async operations end
  ],
  page.updateTitle // This action will be run when previous async operations end
]
```

Action function example:

```
function setLoader (args, state) {
  state.set(['loader'], true); // State is wrapped Baobab tree, it's contains all baobab methods
}

function getData (args, state, output, services) {
  var api = services.locator.resolve('api'); // Services is object with app context things like API service, or Logger.
  
  api.getData()
    .then((response) => output.success({ data: response.data }) // Output is function that accept object to extend args
    .catch((error) => output.error({ error })
}
```

More about signals you can read here:
[Appstate repo](https://github.com/markuplab/appstate)
[cerebraljs.com](http://cerebraljs.com)

## Service locator

Service locator is good thing for big projects, it's allow build clear application structure in OOP paradigm.
It's useful when you want use any things like XHR library, or Firebase client and want wrap basic library with any app-specifing things, like logs.

## Misc

- ES6 + JSX
- Budo for fast incremental rebuilds
- Hot Module Replacement without any tricks/plugins
