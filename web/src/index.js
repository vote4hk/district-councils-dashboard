import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import App from './App'
import createHistory from './createHistory'
import './i18n'
import './index.css'

ReactDOM.render(
  <Router history={createHistory()}>
    <App />
  </Router>,
  document.getElementById('root')
)
