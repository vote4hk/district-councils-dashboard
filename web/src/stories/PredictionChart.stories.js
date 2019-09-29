import React from 'react'
import DCPredictionChartPanel from 'components/organisms/PredictionChartPanel'

export default { title: 'Prediction Chart' }

export const PredictionChartPanel = props => {
  const [settings, setSettings] = React.useState([[0, 0, 0], [0, 0, 0]])
  return (
    <DCPredictionChartPanel
      settings={settings}
      setSettings={setSettings}
    ></DCPredictionChartPanel>
  )
}
