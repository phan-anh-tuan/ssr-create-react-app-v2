require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

//require('ignore-styles')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const React = require('react')
const renderToString = require('react-dom/server').renderToString;
const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const Provider = require('react-redux').Provider
const thunkMiddleware = require('redux-thunk').default
const loggerMiddleware = require('redux-logger').createLogger()

const butter = require('buttercms')('b60a008584313ed21803780bc9208557b3b49fbb')
const helloReducer = require('../src/reducers/helloReducer')
const Hello = require('../src/containers/Hello')

function handleRender(req, res) {
  console.log(`request hit server`)
  
  return butter.post.list().then((resp) => resp.data)
  .then( (json) => {
          const preloadedState = { posts: { data: json.data}}
          const store = createStore(helloReducer,
            preloadedState,
            applyMiddleware(thunkMiddleware,
                            loggerMiddleware
            ))
          
          const element = React.createElement(Provider, {store: store}, React.createElement(Hello))
          const html = renderToString(element)

          /*const html = renderToString(
            <Provider store={store}>
              <Hello />
            </Provider>
          )*/

          const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
          fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) throw err;
            const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`).replace(/<script><\/script>/,`<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>`);
            res.send(document);
          });
  })
  .catch( (error) => console.log(`error`, error))
}

const app = express();

// Support Gzip
app.use(compression())

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Setup logger
app.use(morgan('combined'))

// Serve built files with static files middleware
app.use('/static',express.static(path.resolve(__dirname, '..', 'build/static')))
//app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Serve requests with our handleRender function
app.get('/', handleRender);

module.exports = app