//

import React, { useEffect, useState } from 'react'
import Rows from 'components/atoms/Rows'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import PersonEvent from 'components/molecules/PersonEvent'
import Typography from '@material-ui/core/Typography'
import { DefaultLink } from 'components/atoms/Link'

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

const StyledRows = styled(Rows)`
  && {
    align-items: normal;
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
  const { fcUuid, name, filterFunc } = props
  const [events, setEvents] = useState([])
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        `https://api.hkfactcheck.io/persons/${fcUuid}/events`
      )

      setEvents(result.data.filter(filterFunc).filter((_, i) => i < 5))
    }
    fetchData()
  }, [])
  const fcUri = `https://hkfactcheck.io/person/${fcUuid}/${name}`

  return (
    <>
      <Container>
        {events.length > 0 ? (
          <Typography variant="body">
            以下資料取自
            <DefaultLink target="_blank" href={fcUri}>
              選區事實處
            </DefaultLink>
            ，如有補充或錯漏，請即
            <DefaultLink target="_blank" href={fcUri}>
              報料
            </DefaultLink>
            ！
          </Typography>
        ) : (
          <Typography variant="body">
            此人未有事件記錄，請即到
            <DefaultLink target="_blank" href={fcUri}>
              選區事實處
            </DefaultLink>
            報料！
          </Typography>
        )}
      </Container>
      <StyledRows>
        {events.map(event => (
          <PersonEvent key={event.eventId} {...event}></PersonEvent>
        ))}
        {events.length > 0 && (
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
        )}
      </StyledRows>
    </>
  )
}

FCPersonData.propsType = {
  uuid: PropTypes.string,
  fcUuid: PropTypes.string,
  filterFunc: PropTypes.func.isRequired,
}

export default FCPersonData
