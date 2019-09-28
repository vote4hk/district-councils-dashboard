import React from 'react'
import styled from 'styled-components'
import ValueSlider from 'components/molecules/ValueSlider'
import PropTypes from 'prop-types'

const StyledValueSlider = styled(ValueSlider)`
  && {
    margin-top: 16px;
  }
`

function PredictionChartPanel(props) {
  return (
    <div>
      <StyledValueSlider label={'18-30'}></StyledValueSlider>
      <StyledValueSlider label={'31-59'}></StyledValueSlider>
      <StyledValueSlider label={'60+'}></StyledValueSlider>
    </div>
  )
}

PredictionChartPanel.propTypes = {
  settings: PropTypes.array.isRequired,
  setSettings: PropTypes.func.isRequired,
}

export default PredictionChartPanel
