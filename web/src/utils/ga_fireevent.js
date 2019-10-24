import GoogleAnalytics from 'react-ga'

const trackingId = process.env.REACT_APP_GA_TRACKING_ID
if (!trackingId) {
  throw new Error(
    'Invalid google tracking ID. or set to UA-000000-01 if you dont have any'
  )
}
GoogleAnalytics.initialize(trackingId)

export function fireEvent({ ca, ac, lb, val = 1, nonInteraction = true }) {
  GoogleAnalytics.event({
    category: `${ca}`,
    action: `${ac}_${lb}`,
    label: lb,
    value: val,
    nonInteraction: nonInteraction,
  })
  console.log(`fire Event!`)
}
