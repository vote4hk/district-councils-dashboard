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

const Label = styled(Text)`
  && {
    min-width: 60px;
  }
`

export const ValueSlider = props => {
  const { value, setValue } = props
  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const { label, className, color } = props
  return (
    <div className={className}>
      <Columns>
        <Label>{label}</Label>
        <SliderContainer>
          <Slider value={value} onChange={handleSliderChange} color={color} />
        </SliderContainer>
        <Text>{value}%</Text>
      </Columns>
    </div>
  )
}

ValueSlider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default ValueSlider
