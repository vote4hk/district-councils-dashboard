import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { COLORS } from 'ui/theme'
const StyledSubtTitle = styled(Typography)`
  && {
    color: ${COLORS.highlightedText};
  }
`

export const SuccessText = styled(Typography)`
  && {
    && {
      font-weight: 500;
      color: ${COLORS.common.success};
    }
  }
`

export const FailureText = styled(Typography)`
  && {
    && {
      font-weight: 500;
      color: ${COLORS.common.failure};
    }
  }
`

export const TitleText = props => {
  return <Typography variant="h2" {...props} />
}

export const SubTitleText = props => {
  return <StyledSubtTitle variant="h3" {...props} />
}
