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
              <Typography variant="h6">{c.name_zh}</Typography>
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
                <ExpansionPanel key={d.dc_code}>
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{d.dc_name_zh}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>{renderDCCA(d)}</ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </>
          )
        }}
      </Query>
    </Container>
  )
}

export default withRouter(DistrictSelector)
