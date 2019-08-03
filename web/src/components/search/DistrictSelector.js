import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import area from '../../data/area'
import district from '../../data/district'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { DRAWER_CLOSE } from 'reducers/drawer'
import ContextStore from 'ContextStore'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const SideBar = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 200px;
    max-width: 200px;
  }
`

const DistrictContainer = styled(Button)`
  && {
    width: 120px;
    justify-content: left;
  }
`

const DistrictSelector = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)
  const renderDCCA = code => {
    if (!code) return null
    return (
      <div>
        {Object.keys(district['2019'][code]).map(dcca => {
          return (
            <DistrictContainer
              key={district['2019'][code][dcca].code}
              onClick={() => {
                dispatch({ type: DRAWER_CLOSE })
                props.history.push(`/district/2019/${dcca}`)
              }}
              color="secondary"
            >
              <Typography variant="h6">
                {district['2019'][code][dcca].name}
              </Typography>
            </DistrictContainer>
          )
        })}
      </div>
    )
  }

  return (
    <Container>
      {area.map(a => (
        <ExpansionPanel key={a.dccode}>
          <ExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{a.dname_chi}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{renderDCCA(a.dccode)}</ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Container>
  )
}

export default withRouter(DistrictSelector)
