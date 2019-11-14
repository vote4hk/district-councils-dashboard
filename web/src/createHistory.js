import { createBrowserHistory } from 'history'
import ReactPixel from 'react-facebook-pixel'
import GoogleAnalytics from 'react-ga'

GoogleAnalytics.initialize(process.env.REACT_APP_GA_TRACKING_ID)
window.ga('send', 'pageview')

const fbPixelAdvancedMatching = {}
const fbPixelOptions = {
  autoConfig: true,
  debug: false,
}
ReactPixel.init(
  process.env.REACT_APP_FACEBOOK_TRACKING_ID,
  fbPixelAdvancedMatching,
  fbPixelOptions
)

export default function createHistory(options = {}) {
  const history = createBrowserHistory()
  history.listen(({ pathname, search }) => {
    const page = `${pathname}${search}`
    GoogleAnalytics.set({
      page,
      ...options,
    })
    GoogleAnalytics.pageview(page)

    ReactPixel.pageView()
  })
  return history
}
