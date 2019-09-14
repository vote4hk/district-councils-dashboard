//

import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

const Container = styled.div`
  && {
    width: 100%;
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`

const StyledButton = styled(Button)`
  && {
    border: 1px black solid;
    height: 48px;
    padding: 0 32px;
  }
`

const FCPersonData = props => {
  const { fcUuid, name } = props

  const fcUri = `https://hkfactcheck.github.io/person/${fcUuid}/${name}`

  return (
    <>
      <Container>
        <StyledButton
          onClick={() => {
            const win = window.open(fcUri, '_blank')
            win.focus()
          }}
        >
          更多資料及往績
        </StyledButton>
      </Container>
    </>
  )
}

FCPersonData.propsType = {
  uuid: PropTypes.string,
  fcUuid: PropTypes.string,
}

export default FCPersonData
