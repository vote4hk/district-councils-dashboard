import React from 'react'
import { Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import { DRAWER_CLOSE } from 'reducers/drawer'
import ContextStore from 'ContextStore'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { QUERY_GET_AREA } from 'queries/gql'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`

const DistrictContainer = styled(Button)`
  && {
    width: 120px;
    justify-content: left;
    text-align: left;
  }
`

const DistrictExpansionPanel = styled(ExpansionPanel)`
  && {
    margin: 0;
  }
`

const DistrictExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
  }
`

const DistrictExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    padding: 16px;
  }
`

const DistrictSelector = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)
  const renderDCCA = district => {
    return (
      <div>
        {district.constituencies.map(c => {
          return (
            <DistrictContainer
              key={c.code}
              onClick={() => {
                dispatch({ type: DRAWER_CLOSE })
                props.history.push(`/district/2019/${c.code}`)
              }}
              color="secondary"
            >
              <Typography variant="h5">{c.name_zh}</Typography>
            </DistrictContainer>
          )
        })}
      </div>
    )
  }

  return (
    <Container>
      <Query query={QUERY_GET_AREA}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          return (
            <>
              {data.dcd_districts.map(d => (
                <DistrictExpansionPanel key={d.dc_code}>
                  <DistrictExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography variant="h5">{d.dc_name_zh}</Typography>
                  </DistrictExpansionPanelSummary>
                  <DistrictExpansionPanelDetails>
                    {renderDCCA(d)}
                  </DistrictExpansionPanelDetails>
                </DistrictExpansionPanel>
              ))}
            </>
          )
        }}
      </Query>
    </Container>
  )
}

export default withRouter(DistrictSelector)
