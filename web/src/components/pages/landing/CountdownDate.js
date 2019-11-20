import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Countdown from 'components/atoms/Countdown'

const Container = styled.div`
  width: 100%;
  padding: 16px;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
  flex-grow: 1;
`

const TopSection = styled(Container)`
  && {
    background-color: #f2f2f3;
  }
`

const CountdownContainer = styled.div`
  && {
    width: 100%;
  }
`

const electionDate = 'Nov 24, 2019 07:30:00'

export default function CountdownDate({ t }) {
  return (
    <TopSection>
      {Date.parse(new Date(electionDate)) > Date.parse(new Date()) && (
        <CountdownContainer>
          <Typography variant="h5" style={{ textAlign: 'center' }} gutterBottom>
            {/* 距離投票日 */}
            {t('index.title1')}
          </Typography>
          <Countdown date={electionDate} />
        </CountdownContainer>
      )}
      {/* <LandingIcon /> */}
    </TopSection>
  )
}

CountdownDate.propTypes = {
  t: PropTypes.func.isRequired,
}
