import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import React from 'react'

const StyledChip = styled(Chip)`
  && {
    font-size: ${props => props.fontsize || 12}px;
    background: ${props => props.backgroundcolor || '#e0e0e0'};
    border: ${props => props.borderwidth || 0}px
      ${props => props.bordercolor || 'rgba(0, 0, 0, 0.5)'} solid;
  }
`

export const Tag = props => {
  return (
    <StyledChip
      fontsize={props.fontsize}
      backgroundcolor={props.backgroundcolor}
      bordercolor={props.bordercolor}
      borderwidth={props.borderwidth}
      label={props.value}
      size="small"
      onClick={props.handleClick}
    />
  )
}
