import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import React from 'react'

const StyledCard = styled(Card)`
  && {
    padding: 16px;
    margin: 16px;
    background-color: #fafafa;
  }
`

export const PlainCard = props => {
  return <StyledCard {...props}>{props.children}</StyledCard>
}
