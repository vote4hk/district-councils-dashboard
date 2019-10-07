import React from 'react'
import DCSlider from 'components/atoms/Slider'
import DCValueSlider from 'components/molecules/ValueSlider'

export default { title: 'Slider' }

export const Slider = () => <DCSlider defaultValue={50}></DCSlider>
export const ValueSlider = () => <DCValueSlider label="61+"></DCValueSlider>
