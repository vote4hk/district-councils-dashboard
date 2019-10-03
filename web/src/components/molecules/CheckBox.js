import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox } from '@material-ui/core/'

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
}

export default function CheckBox(props) {
  const { label, checked, setChecked, className } = props

  function handleChange(event) {
    setChecked(event.target.checked)
  }

  return (
    <>
      <FormControlLabel
        className={className}
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label={label}
      />
    </>
  )
}
