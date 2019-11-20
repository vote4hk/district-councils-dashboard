import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import ErrorBoundary from './ErrorBoundary'
import App from './App'
import './i18n'
import './index.css'

Sentry.init({ dsn: process.env.SENTRY_DSN })

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById('root')
)
