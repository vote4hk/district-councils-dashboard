import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { styledComponentTheme } from 'ui/theme/main'
const StyledSubtTitle = styled(Typography)`
  && {
    color: ${props => props.theme.subtextColor};
  }
`

export const SuccessText = styled(Typography)`
  && {
    && {
      color: ${styledComponentTheme.common.success};
    }
  }
`

export const FailureText = styled(Typography)`
  && {
    && {
      color: ${styledComponentTheme.common.failure};
    }
  }
`

export const TitleText = props => {
  return <Typography variant="h2" {...props} />
}

export const SubTitleText = props => {
  return <StyledSubtTitle variant="h3" {...props} />
}
