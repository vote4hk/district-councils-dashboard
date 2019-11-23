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
  withLanguage,
} from 'utils/helper'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: column;
    vertical-align: top;
  }
`

const DistrictContainer = styled(Button)`
  && {
    width: 50%;
    justify-content: left;
    text-align: left;
    text-transform: capitalize;
    font-size: ${props => props.fontsize}px;
  }
`

const DistrictExpansionPanel = styled(ExpansionPanel)`
  && {
    box-shadow: none;
  }
`

const DistrictExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
    font-weight: 600px;
    .Mui-expanded {
    }
  }
`

const DistrictExpansionPanelDetails = styled(ExpansionPanelDetails)`
  && {
    padding: 0 16px 0;
  }
`

const DistrictSelector = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  const { t } = useTranslation()

  const renderDCCA = district => {
    return (
      <div key={district.dc_code}>
        <DistrictContainer
          key={district.dc_code}
          onClick={() => {
            dispatch({ type: DRAWER_CLOSE })
            props.history.push(getDistrictOverviewUriFromTag(district.dc_code))
          }}
          color="secondary"
        >
          <Typography variant="h5">{t('districtSelector.overview')}</Typography>
        </DistrictContainer>
        {district.constituencies.map(c => {
          return (
            <DistrictContainer
              key={c.code}
              onClick={() => {
                dispatch({ type: DRAWER_CLOSE })
                props.history.push(getConstituencyUriFromTag(c.code))
              }}
            >
              <Typography variant="h5">
                {withLanguage(c.name_en, c.name_zh)}
              </Typography>
            </DistrictContainer>
          )
        })}
      </div>
    )
  }

  const renderArea = (area, i) => (
    <div key={`area-${i}`}>
      {area.districts
        .sort((a, b) => {
          if (a.dc_code > b.dc_code) return 1
          if (a.dc_code < b.dc_code) return -1
          return 0
        })
        .map((d, index) => (
          <DistrictExpansionPanel
            key={`district-panel-${d.dc_code}`}
            TransitionProps={{ unmountOnExit: true }}
          >
            <DistrictExpansionPanelSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h5">
                {withLanguage(d.dc_name_en, d.dc_name_zh)}
              </Typography>
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
              area_name_zh: withLanguage(d.area_name_en, d.area_name_zh),
            })),
            'area_code'
          )

          const areasWithDistricts = areas.map(a => ({
            ...a,
            districts: data.dcd_districts.filter(
              d =>
                withLanguage(d.area_name_en, d.area_name_zh) ===
                withLanguage(a.area_name_en, a.area_name_zh)
            ),
          }))

          const areaNames = areas.map(a =>
            withLanguage(a.area_name_en, a.area_name_zh)
          )

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
