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
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { UnstyledButton } from 'components/atoms/Button'
import { useTranslation } from 'react-i18next'

const StyledValueSlider = styled(ValueSlider)`
  && {
    margin-top: 8px;
    .MuiSlider-root {
      color: ${COLORS.main.primary};
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
      color: ${COLORS.main.primary};
    }
  }
`

const ToggleButton = styled(UnstyledButton)`
  && {
    border-radius: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
    padding: 5px 0px;
    color: color: ${COLORS.main.text};
    :hover {
      color: ${COLORS.main.primary};
    }
  }
`

PredictionChartPanel.propTypes = {
  settings: PropTypes.object.isRequired,
  setSettings: PropTypes.func.isRequired,
}

function PredictionChartPanel(props) {
  const { settings, setSettings } = props

  const [showSettings, setShowSettings] = React.useState(false)

  const handleClose = reason => {
    if (reason === 'clickaway') {
      return
    }
    setShowSettings(!showSettings)
  }

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

  /* 
     20191026 @wingkwong: 
        <Tabs> iterates each children so that we cannot just place the compnent between <Tabs> and <TabSection>
    */
  const renderSettings = () => {
    const { t } = useTranslation()
    return (
      <>
        <ToggleButton onClick={handleClose}>
          {/* {showSettings ? '隱藏設定' : '顯示設定'} */}
          {showSettings
            ? t('predictionChartPanel.button.hide')
            : t('predictionChartPanel.button.show')}
          {showSettings ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ToggleButton>
        <Collapse in={showSettings}>
          <Rows>
            <StyledCheckBox
              // label="只計算新增選民，同時假設上屆投票選民維持相冋政治取向"
              label={t('predictionChartPanel.checkbox.label1')}
              checked={settings.config.reference_last_election}
              setChecked={setSettingConfigFunc('reference_last_election')}
            ></StyledCheckBox>
            <StyledCheckBox
              // label="為上屆自動當選議員加入對立陣營對手"
              label={t('predictionChartPanel.checkbox.label2')}
              checked={settings.config.auto_won_add_components}
              setChecked={setSettingConfigFunc('auto_won_add_components')}
            ></StyledCheckBox>
          </Rows>
        </Collapse>
      </>
    )
  }
  return (
    <div>
      <Tabs titles={['投票取向', '投票率']} buttonLayout="centered">
        <TabSection>
          {renderSettings()}
          <Text variant="h5">
            {/* 民主支持率 */}
            {t('predictionChartPanel.tabSection.title1')}
          </Text>
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
          {renderSettings()}
          <Text variant="h5">
            {/* 已登記選民投票率 */}
            {t('predictionChartPanel.tabSection.title2')}
          </Text>
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
      </Tabs>
    </div>
  )
}

export default PredictionChartPanel
