import React from 'react'
import styled from 'styled-components'
import ValueSlider from 'components/molecules/ValueSlider'
import CheckBox from 'components/molecules/CheckBox'
import PropTypes from 'prop-types'
import Tabs from 'components/organisms/Tabs'
import { COLORS } from 'ui/theme'
import Text from 'components/atoms/Text'
import Rows from 'components/atoms/Rows'
import { Box } from '@material-ui/core'

const StyledValueSlider = styled(ValueSlider)`
  && {
    margin-top: 8px;
    .MuiSlider-root {
      color: ${COLORS.main.highlightedText};
    }
  }
`

const TabSection = styled(Box)`
  && {
    padding: 8px 0 0;
  }
`

const StyledCheckBox = styled(CheckBox)`
  && {
    .MuiSvgIcon-root {
      color: ${COLORS.main.highlightedText};
    }
  }
`

PredictionChartPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  setSettings: PropTypes.func.isRequired,
}

function PredictionChartPanel(props) {
  const { settings, setSettings } = props

  const setSettingConfigFunc = field => flag => {
    setSettings({
      config: Object.assign(settings.config, { [field]: flag }),
      camp_rate: [...settings.camp_rate],
      vote_rate: [...settings.vote_rate],
    })
  }
  const setSettingFunc = (x, y) => value =>
    setSettings({
      config: {
        ...settings.config,
      },
      camp_rate: settings.camp_rate.map((v, i) =>
        x === 0 && y === i ? value : v
      ),
      vote_rate: settings.vote_rate.map((v, i) =>
        x === 1 && y === i ? value : v
      ),
    })
  return (
    <div>
      <Tabs titles={['投票取向', '投票率', '設定']} buttonLayout="centered">
        <TabSection>
          <Text variant="h5">非建制支持率</Text>
          <StyledValueSlider
            label={'18-30歲'}
            value={settings.camp_rate[0]}
            setValue={setSettingFunc(0, 0)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'31-59歲'}
            value={settings.camp_rate[1]}
            setValue={setSettingFunc(0, 1)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'60歲及以上'}
            value={settings.camp_rate[2]}
            setValue={setSettingFunc(0, 2)}
          ></StyledValueSlider>
        </TabSection>
        <TabSection>
          <Text variant="h5">已登記選民投票率</Text>
          <StyledValueSlider
            label={'18-30歲'}
            value={settings.vote_rate[0]}
            setValue={setSettingFunc(1, 0)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'31-59歲'}
            value={settings.vote_rate[1]}
            setValue={setSettingFunc(1, 1)}
          ></StyledValueSlider>
          <StyledValueSlider
            label={'60歲及以上'}
            value={settings.vote_rate[2]}
            setValue={setSettingFunc(1, 2)}
          ></StyledValueSlider>
        </TabSection>
        <TabSection>
          <Rows>
            <StyledCheckBox
              label="參考上一屆資料"
              checked={settings.config.reference_last_election}
              setChecked={setSettingConfigFunc('reference_last_election')}
            ></StyledCheckBox>
            <StyledCheckBox
              label="自動當選議席加入對手"
              checked={settings.config.auto_won_add_components}
              setChecked={setSettingConfigFunc('auto_won_add_components')}
            ></StyledCheckBox>
          </Rows>
        </TabSection>
      </Tabs>
    </div>
  )
}

export default PredictionChartPanel
