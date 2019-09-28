import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'components/atoms/Slider'
import Text from 'components/atoms/Text'

import Columns from 'components/atoms/Columns'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

const SliderContainer = styled(Box)`
  && {
    padding-left: 16px;
    flex-grow: 1;
    padding-right: 16px;
  }
`

const Label = styled(Text)` && {
  min-width: 60px;
}`

export const ValueSlider = props => {
  const [value, setValue] = React.useState(30)

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const { label, className } = props
  return (
    <div className={className}>
      <Columns>
        <Label>{label}</Label>
        <SliderContainer>
          <Slider
            defaultValue={props.defaultValue || 0}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
          />
        </SliderContainer>
        <Text>{value}%</Text>
      </Columns>
    </div>
  )
}

ValueSlider.propTypes = {
  label: PropTypes.string.isRequired,
  shouldShowValue: PropTypes.bool,
}

export default ValueSlider
