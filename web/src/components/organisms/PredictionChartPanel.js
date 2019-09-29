import React from 'react'
import styled from 'styled-components'
import ValueSlider from 'components/molecules/ValueSlider'
import PropTypes from 'prop-types'
import Tabs from 'components/organisms/Tabs'
import { COLORS } from 'ui/theme'
const StyledValueSlider = styled(ValueSlider)`
  && {
    margin-top: 16px;

    & .MuiSlider-root {
      color: ${COLORS.slider.bar};
    }
  }
`

function PredictionChartPanel(props) {
  const { settings, setSettings } = props

  const setSettingFunc = (x, y) => value =>
    setSettings([
      settings[0].map((v, i) => (x === 0 && y === i ? value : v)),
      settings[1].map((v, i) => (x === 1 && y === i ? value : v)),
    ])
  return (
    <div>
      <Tabs titles={['投票取向', '投票率']} buttonLayout="centered">
        <div>
          <StyledValueSlider
            label={'18-30歲'}
            value={settings[0][0]}
            setValue={setSettingFunc(0, 0)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'31-59歲'}
            value={settings[0][1]}
            setValue={setSettingFunc(0, 1)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'60歲及以上'}
            value={settings[0][2]}
            setValue={setSettingFunc(0, 2)}
          ></StyledValueSlider>
        </div>
        <div>
          <StyledValueSlider
            label={'18-30歲'}
            value={settings[1][0]}
            setValue={setSettingFunc(1, 0)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'31-59歲'}
            value={settings[1][1]}
            setValue={setSettingFunc(1, 1)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'60歲及以上'}
            value={settings[1][2]}
            setValue={setSettingFunc(1, 2)}
          ></StyledValueSlider>
        </div>
      </Tabs>
    </div>
  )
}

PredictionChartPanel.propTypes = {
  settings: PropTypes.array.isRequired,
  setSettings: PropTypes.func.isRequired,
}

export default PredictionChartPanel
