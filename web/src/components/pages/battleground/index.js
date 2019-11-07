import React, { Component } from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import DCCACompareMap from '../../DCCACompareMap'
import { Query } from 'react-apollo'
import MainAreas from 'components/district/MainAreas'
import CouncillorContainer from 'components/containers/CouncillorContainer'
import CandidatesContainer from 'components/containers/CandidatesContainer'
import DCCAOverview from 'components/district/DCCAOverview'
import { UnstyledButton } from 'components/atoms/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Collapse from '@material-ui/core/Collapse'
import _ from 'lodash'
import { QUERY_CONSTITUENCIES } from 'queries/gql'
import { Typography } from '@material-ui/core'
import { PlainCard } from '../../molecules/Card'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { UnstyledLink } from 'components/atoms/Link'
import { Alert } from 'components/atoms/Alert'
import { getDistrictOverviewUriFromTag, getParameterByName } from 'utils/helper'
import {
  getCentroidFromYearAndCode,
  getAllFeaturesFromPoint,
} from 'utils/features'
import DCCAElectionHistories from 'components/templates/DCCAElectionHistories'
import { withTranslation } from 'react-i18next'

const groupVoteStat = voteStats => {
  const data = _.groupBy(voteStats, stat => stat.subtype)
  data.aggregations = {
    all_voters: data.VOTERS.map(v => v.count).reduce((c, v) => c + v, 0),
    new_voters: data.NEW_VOTERS.map(v => v.count).reduce((c, v) => c + v, 0),
  }
  return data
}

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 0 16px 0;
  }
`

const BreadcrumbsContainer = styled(Box)`
  && {
    flex-grow: 1;
    padding: 4px 16px;
  }
`
const ToggleMapButton = styled(UnstyledButton)`
  && {
    border-radius: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
`

class BattleGroundPage extends Component {
  constructor(props) {
    super(props)
    const centroid = getCentroidFromYearAndCode(2019, props.match.params.code)
    this.state = {
      showMap: true,
      currentPoint: {
        lng: centroid[0],
        lat: centroid[1],
      },
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //  if (this.props.route.path === nextProps.route.path) return false;
    return true
  }

  handleChangeDistrict = (year, code) => {
    if (!year || !code) return
    this.props.history.push(`/district/${year}/${code}`)
  }

  handleMapClick = coordinate => {
    const point = {
      lng: coordinate[0],
      lat: coordinate[1],
    }

    this.setState({ currentPoint: point })
  }

  handleMapLoaded = props => {
    const { centroid } = props
    const point = {
      lng: centroid[0],
      lat: centroid[1],
    }

    this.setState({ currentPoint: point })
  }
  onPrevElection() {
    const {
      match: {
        params: { code },
      },
    } = this.props
    this.props.history.push(`/district/2015/${code}`)
  }

  onNextElection() {
    const {
      match: {
        params: { year, code },
      },
    } = this.props
    this.props.history.push(`/district/${parseInt(year, 10) + 4}/${code}`)
  }

  render() {
    const { showMap } = this.state
    const {
      match: {
        params: { year = 2019, code },
      },
      location: { search },
      t,
    } = this.props

    // Preset Tab for election history by matching query ?year=<year>
    const queryYear = getParameterByName('year', search)
    const presetTabIndex = ['2003', '2007', '2011', '2015'].findIndex(
      year => year === queryYear
    )

    return (
      <>
        <Query query={QUERY_CONSTITUENCIES} variables={{ year, code }}>
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error! ${error}`
            const district = data.dcd_constituencies[0]
            const previousDistricts = district.predecessors.filter(
              district =>
                district.intersect_area === null ||
                district.intersect_area > 1000
            )

            const pointHistory = getAllFeaturesFromPoint(
              this.state.currentPoint
            )

            const DCCAStatus =
              district.tags &&
              district.tags.find(tag => tag.type === 'boundary')

            return (
              <>
                <BreadcrumbsContainer>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                  >
                    <UnstyledLink
                      onClick={() => {
                        this.props.history.push(`/district/2019`)
                      }}
                    >
                      <Typography color="textPrimary"> {year}</Typography>
                    </UnstyledLink>
                    <UnstyledLink
                      onClick={() => {
                        this.props.history.push(
                          getDistrictOverviewUriFromTag(
                            district.district.dc_code
                          )
                        )
                      }}
                    >
                      <Typography color="textPrimary">
                        {district.district.dc_name_zh}
                      </Typography>
                    </UnstyledLink>
                    <Typography color="primary" style={{ fontWeight: 600 }}>
                      {district.name_zh}（{code}）
                    </Typography>
                  </Breadcrumbs>
                </BreadcrumbsContainer>
                {DCCAStatus && (
                  <Alert>
                    <Typography variant="h6" gutterBottom>
                      {DCCAStatus.tag === '改劃界'
                        ? `此選區於2019年更改劃界`
                        : `此選區為2019年${DCCAStatus.tag}`}
                    </Typography>
                  </Alert>
                )}
                <Container>
                  <CandidatesContainer year={year} code={district.code} />
                </Container>
                <DCCAOverview
                  year={year}
                  name_zh={district.name_zh}
                  dc_code={district.district.dc_code}
                  dc_name_zh={district.district.dc_name_zh}
                  code={district.code}
                  tags={district.tags}
                  voterData={groupVoteStat(district.vote_stats)}
                  description={district.description}
                />
                {/* TODO Refactor style for ToggleMap Button */}
                <ToggleMapButton
                  onClick={() => this.setState({ showMap: !showMap })}
                >
                  {/* {showMap ? '隱藏地圖' : '顯示地圖'} */}
                  {showMap
                    ? t('battleground.button.hide')
                    : t('battleground.button.show')}
                  {showMap ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ToggleMapButton>
                <Collapse in={showMap}>
                  <Box width={'100%'} height={{ sm: '300px', md: '400px' }}>
                    <DCCACompareMap
                      year={year}
                      code={code}
                      currentPoint={this.state.currentPoint}
                      changeDistrict={this.handleChangeDistrict}
                      handleMapClick={this.handleMapClick}
                      handleMapLoaded={this.handleMapLoaded}
                    />
                  </Box>
                </Collapse>
                <MainAreas areas={district.main_areas || []} />

                {DCCAStatus && (
                  <Container>
                    <Typography variant="h6">
                      {DCCAStatus.tag ===
                      // '改劃界'
                      t('battleground.alert.text1')
                        ? // ? `此選區於2019年更改劃界`
                          t('battleground.alert.text2')
                        : // : `此選區為2019年${DCCAStatus.tag}`}
                          `${t('battleground.alert.text3')} ${DCCAStatus.tag}`}
                    </Typography>
                  </Container>
                )}
                <DCCAElectionHistories
                  histories={pointHistory}
                  presetTabIndex={presetTabIndex}
                />
                <PlainCard>
                  <Typography variant="h6">
                    {/* 現任區議員 */}
                    {t('currentTerm.councilor')}
                  </Typography>
                  {previousDistricts.length > 1 && (
                    <Typography variant="h6">{`此區與上屆${previousDistricts.length}個選區重疊`}</Typography>
                  )}
                  {previousDistricts.map((d, index) => (
                    <CouncillorContainer
                      key={index}
                      year={2015}
                      code={d.predecessor.code}
                    />
                  ))}
                </PlainCard>
              </>
            )
          }}
        </Query>
      </>
    )
  }
}

export default withTranslation()(BattleGroundPage)
