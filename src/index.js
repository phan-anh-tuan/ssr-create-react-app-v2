import React from 'react'
import ReactDOM from 'react-dom'
//import HelloTransmitContainer from './containers/Hello'
import Hello from './containers/Hello'

ReactDOM.render(<Hello posts={{data: [{ 'slug': '1', 'title': 'title 1'}, { 'slug': '2', 'title': 'title 2'}, { 'slug': '3', 'title': 'title 3'}, { 'slug': '4', 'title': 'title 4'}, { 'slug': '5', 'title': 'title 5'}, { 'slug': '6', 'title': 'title 6'}]}}/>, document.getElementById('root'))
