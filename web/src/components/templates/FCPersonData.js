//

import React, { useEffect, useState } from 'react'
import Rows from 'components/atoms/Rows'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import PersonEvent from 'components/molecules/PersonEvent'

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
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://api.hkfactcheck.io/persons/${fcUuid}/events`
      )

      setEvents(result.data)
    }
    fetchData()
  }, [])
  const fcUri = `https://hkfactcheck.io/person/${fcUuid}/${name}`

  return (
    <>
      <Rows>
        {events.map(event => (
          <PersonEvent key={event.eventId} {...event}></PersonEvent>
        ))}
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
      </Rows>
    </>
  )
}

FCPersonData.propsType = {
  uuid: PropTypes.string,
  fcUuid: PropTypes.string,
}

export default FCPersonData
