import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import React from 'react'

const StyledChip = styled(Chip)`
  && {
    font-size: 12px;
    margin-top: 2px;
    margin-left: 3px;
  }
`

export const Tag = props => {
  return (
    <StyledChip
      color={props.color}
      label={props.value}
      variant={props.variant || 'outlined'}
      size="small"
      onClick={props.handleClick}
    />
  )
}
