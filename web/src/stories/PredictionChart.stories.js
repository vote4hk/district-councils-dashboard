import React from 'react'
import DCPredictionChartPanel from 'components/organisms/PredictionChartPanel'

export default { title: 'Prediction Chart' }

export const PredictionChartPanel = props => {
  const [settings, setSettings] = React.useState({
    config: {
      auto_won_add_components: false,
      reference_last_election: true,
    },
    camp_rate: [0, 0, 0],
    vote_rate: [0, 0, 0],
  })
  return (
    <DCPredictionChartPanel
      settings={settings}
      setSettings={setSettings}
    ></DCPredictionChartPanel>
  )
}
