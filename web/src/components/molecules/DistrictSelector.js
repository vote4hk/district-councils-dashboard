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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AreaTabs from 'components/organisms/AreaTabs'
import {
  getDistrictOverviewUriFromTag,
  getConstituencyUriFromTag,
} from 'utils/helper'

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
    margin: 5px 0;
    box-shadow: none;
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
        <DistrictContainer
          key={district.dc_code}
          onClick={() => {
            dispatch({ type: DRAWER_CLOSE })
            props.history.push(getDistrictOverviewUriFromTag(district.dc_code))
          }}
          color="secondary"
        >
          <Typography variant="h5">總覽</Typography>
        </DistrictContainer>
        {district.constituencies.map(c => {
          return (
            <DistrictContainer
              key={c.code}
              onClick={() => {
                dispatch({ type: DRAWER_CLOSE })
                props.history.push(getConstituencyUriFromTag(c.code))
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

  const renderArea = (area, i) => (
    <div key={`area-${i}`}>
      {area.districts.map((d, index) => (
        <DistrictExpansionPanel
          key={`district-panel-${d.dc_code}`}
          TransitionProps={{ unmountOnExit: true }}
        >
          <DistrictExpansionPanelSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">{d.dc_name_zh}</Typography>
          </DistrictExpansionPanelSummary>
          <DistrictExpansionPanelDetails>
            {renderDCCA(d)}
          </DistrictExpansionPanelDetails>
        </DistrictExpansionPanel>
      ))}
    </div>
  )

  return (
    <Container>
      <Query query={QUERY_GET_AREA}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`

          const areas = _.uniqBy(
            data.dcd_districts.map(d => ({
              area_code: d.area_code,
              area_name_zh: d.area_name_zh,
            })),
            'area_code'
          )

          const areasWithDistricts = areas.map(a => ({
            ...a,
            districts: data.dcd_districts.filter(
              d => d.area_name_zh === a.area_name_zh
            ),
          }))

          const areaNames = areas.map(a => a.area_name_zh)

          return (
            <AreaTabs titles={areaNames} expanded={props.expanded}>
              {areasWithDistricts.map((a, index) => {
                return renderArea(a, index)
              })}
            </AreaTabs>
          )
        }}
      </Query>
    </Container>
  )
}

export default withRouter(DistrictSelector)
