import React from 'react'
import DCCheckBox from 'components/molecules/CheckBox'

import DCLoadingButton from 'components/molecules/LoadingButton'
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

export const LoadingButton = props => {
  return (
    <>
      <DCLoadingButton label={'Loading'} isLoading={true}></DCLoadingButton>
      <DCLoadingButton
        label={'Not Loading'}
        isLoading={false}
      ></DCLoadingButton>
    </>
  )
}
