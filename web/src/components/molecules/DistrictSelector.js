import React from 'react'
import { Typography, Button } from '@material-ui/core'
import styled from 'styled-components'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import _ from 'lodash'
import { DRAWER_CLOSE } from 'reducers/drawer'
import ContextStore from 'ContextStore'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import { QUERY_GET_AREA } from 'queries/gql'
import Grid from '@material-ui/core/Grid'
import AreaTabs from 'components/organisms/AreaTabs'

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

const DistrictGrid = styled(Grid)`
  && {
    margin: 5px;
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

  // TODO Change to use 2 columns design
  const renderArea = districts => {
    return _.chunk(districts, 1).map((row, index) => (
      <Grid container wrap="nowrap" key={`districts-row-${index}`}>
        {row.map(d => (
          <DistrictGrid item xs={12} key={`district-item-${d.dc_code}`}>
            <DistrictExpansionPanel key={`district-panel-${d.dc_code}`}>
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
          </DistrictGrid>
        ))}
      </Grid>
    ))
  }

  return (
    <Container>
      <Query query={QUERY_GET_AREA}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const areas = _.uniq(data.dcd_districts.map(d => d.area_name_zh))

          return (
            <AreaTabs titles={areas}>
              {areas.map(areaName => {
                return renderArea(
                  data.dcd_districts.filter(d => d.area_name_zh === areaName)
                )
              })}
            </AreaTabs>
          )
        }}
      </Query>
    </Container>
  )
}

export default withRouter(DistrictSelector)
