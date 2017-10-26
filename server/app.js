//require('ignore-styles')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
})

const path = require('path')
const fs = require('fs')
const React = require('react')
//const HelloTransmitContainer = require('../src/containers/Hello')
const Hello = require('../src/containers/Hello')
const Transmit = require('react-transmit');
const ReactDOMServer = require('react-dom/server');

function handleApi(req, res) {
    const posts = { posts : {
        data: [{ 'slug': '1', 'title': 'title 1'}, 
              { 'slug': '2', 'title': 'title 2'}, 
              { 'slug': '3', 'title': 'title 3'}, 
              { 'slug': '4', 'title': 'title 4'}, 
              { 'slug': '5', 'title': 'title 5'}, 
              { 'slug': '6', 'title': 'title 6'},
              { 'slug': '7', 'title': 'title 7'}]
            }
        }
    res.json(posts)
}

function handleRender(req, res) {
  console.log(`request hit server`)
  
  var element = React.createElement(Hello, {posts: {data: [{ 'slug': '1', 'title': 'title 1'}, { 'slug': '2', 'title': 'title 2'}, { 'slug': '3', 'title': 'title 3'}, { 'slug': '4', 'title': 'title 4'}, { 'slug': '5', 'title': 'title 5'}, { 'slug': '6', 'title': 'title 6'}]}})
  var reactString = ReactDOMServer.renderToString(element)
  console.log(reactString)
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) throw err;
    
    const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${reactString}</div>`);
    res.send(document);

  });

  /*

  Transmit.renderToString(HelloTransmitContainer)
  .then(({reactString, reactData}) => {
    //console.log(`${reactString}`)
    //console.log(`${JSON.stringify(reactData)}`)
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) throw err;
      
      const document = data.replace(/<div id="root"><\/div>/, `<div id="root">${reactString}</div>`);
      const output = Transmit.injectIntoMarkup(document, reactData, ['/build/client.js']);
      //console.log(`${document}`)
      //console.log(`${output}`)
      res.send(document);
      //res.send(output);
    });
  })
  .catch((error) => {
    console.log(error.stack)
    //res(error.stack).type("text/plain").code(500);
  });*/
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
app.get('/api', handleApi);

app.get('/', handleRender);



module.exports = app