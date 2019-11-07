const express = require('express')
const next = require('next')
require('dotenv').config()

const handleSitemap = require('./lib/sitemap')

const dev = process.env.NODE_ENV !== 'production'

const PORT = process.env.PORT || 3000
const PUBLIC_URL = process.env.PUBLIC_URL || 'localhost'

const app = next({ dev })
const handle = app.getRequestHandler()

// Nextjs's server prepared
app.prepare().then(() => {
  const server = express()

  handleSitemap({ server })

  server.get('*', (req, res) => handle(req, res))

  // starting express server
  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on ${PUBLIC_URL}:${PORT}`) // eslint-disable-line no-console
  })
})
