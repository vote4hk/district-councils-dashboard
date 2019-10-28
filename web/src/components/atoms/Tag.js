import styled from 'styled-components'
import Chip from '@material-ui/core/Chip'
import React from 'react'
import { COLORS } from 'ui/theme'

const StyledChip = styled(Chip)`
  && {
    font-size: ${props => props.fontsize || 12}px;
    background: ${props => props.backgroundcolor || COLORS.main.primary};
    color: ${props => props.textcolor || COLORS.main.background};
    border: ${props => props.borderwidth || 0}px
      ${props => props.bordercolor || 'rgba(0, 0, 0, 0.5)'} solid;
  }
`

export const Tag = props => {
  return (
    <StyledChip
      fontSize={props.fontsize}
      textcolor={props.textcolor}
      backgroundcolor={props.backgroundcolor}
      bordercolor={props.bordercolor}
      borderwidth={props.borderwidth}
      label={props.value}
      size="small"
      onClick={props.handleClick}
      className={props.className}
    />
  )
}
