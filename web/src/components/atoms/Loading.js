import React from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

const Placeholder = styled.div`
  && {
    width: 100%;
    height: calc(100vh - 56px);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const CentredCircularProgress = styled(CircularProgress)`
  && {
    max-width: 50%;
  }
`

export const Loading = props => {
  return (
    <Placeholder>
      <CentredCircularProgress thickness={3} size={64} color="secondary" />
    </Placeholder>
  )
}
