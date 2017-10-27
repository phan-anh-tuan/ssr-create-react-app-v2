const React = require('react')
const render = require('react-dom').render
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const Provider = require('react-redux').Provider
const thunkMiddleware = require('redux-thunk').default
const createLogger = require('redux-logger').createLogger
const helloReducer = require('../reducers/helloReducer')
const Hello = require('./Hello')

module.exports = exports = class App extends React.Component {

  render(){
    const loggerMiddleware = createLogger();
    // Grab the state from a global variable injected into the server-generated HTML
    
    const preloadedState = window.__PRELOADED_STATE__

    // Allow the passed state to be garbage-collected
    delete window.__PRELOADED_STATE__

    // Create Redux store with initial state
    const store = createStore(helloReducer,
                              preloadedState,
                              applyMiddleware(thunkMiddleware,
                                              loggerMiddleware
                              ))
    return (
      <Provider store={store}>
        <Hello />
      </Provider>
    )
  }
}
