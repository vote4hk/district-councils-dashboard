import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import React from 'react'

const StyledChip = styled(Chip)`
  && {
    color: ${props => props.color};
  }
`

export const Tag = props => {
  return (
    <StyledChip
      label={props.value}
      variant="outlined"
      color="secondary"
      // avatar={<Avatar>MB</Avatar>}
      onClick={props.handleClick}
    />
  )
}
