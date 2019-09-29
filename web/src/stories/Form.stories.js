import React from 'react'
import DCCheckBox from 'components/molecules/CheckBox'

export default { title: 'Form' }

export const CheckBox = props => {
  const [checked, setChecked] = React.useState(false)
  return (
    <DCCheckBox
      label={'checkbox text'}
      checked={checked}
      setChecked={setChecked}
    ></DCCheckBox>
  )
}
