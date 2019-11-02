const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
const { getDistricts } = require('./data')

const handleSitemap = ({ server }) => {
  let sitemap

  server.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml')
    res.header('Content-Encoding', 'gzip')

    try {
      const smStream = new SitemapStream({
        hostname: process.env.PUBLIC_URL,
      })
      const pipeline = smStream.pipe(createGzip())

      getDistricts().then(urls => {
        // Add URLs
        urls.forEach(url => {
          smStream.write(url)
        })
        smStream.end()

        // cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm)
        // stream the response
        pipeline.pipe(res).on('error', (err) => { throw err })
      })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  })
}

module.exports = handleSitemap
