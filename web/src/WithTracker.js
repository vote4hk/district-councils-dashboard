import React from 'react'
import GoogleAnalytics from 'react-ga'

const trackingId = process.env.REACT_APP_GA_TRACKING_ID
if (!trackingId) {
  throw new Error(
    'Invalid google tracking ID. or set to UA-000000-01 if you dont have any'
  )
}
GoogleAnalytics.initialize(trackingId)

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = page => {
    GoogleAnalytics.set({
      page,
      ...options,
    })
    GoogleAnalytics.pageview(page)
  }

  const HOC = class extends React.Component {
    componentDidMount() {
      const page = this.props.location.pathname
      trackPage(page)
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname
      const nextPage = nextProps.location.pathname

      if (currentPage !== nextPage) {
        trackPage(nextPage)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return HOC
}

export default withTracker
