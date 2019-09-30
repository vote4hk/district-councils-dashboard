import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import DCCACompareMap from '../../DCCACompareMap'
import { Query } from 'react-apollo'
import MainAreas from 'components/district/MainAreas'
import CouncillorContainer from 'components/containers/CouncillorContainer'
import CandidateList from 'components/district/CandidateList'
import DCCAOverview from 'components/district/DCCAOverview'
import { UnstyledButton } from 'components/atoms/Button'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Collapse from '@material-ui/core/Collapse'
import _ from 'lodash'
import { QUERY_CONSTITUENCIES } from 'queries/gql'
import { Typography } from '@material-ui/core'
import { PlainCard } from '../../molecules/Card'

const groupVoteStat = voteStats => {
  const data = _.groupBy(voteStats, stat => stat.subtype)
  data.aggregations = {
    all_voters: data.VOTERS.map(v => v.count).reduce((c, v) => c + v, 0),
    new_voters: data.NEW_VOTERS.map(v => v.count).reduce((c, v) => c + v, 0),
  }
  return data
}
class BattleGroundPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMap: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //  if (this.props.route.path === nextProps.route.path) return false;
    return true
  }

  handleCandidateSelected = candidateId => {
    this.props.history.push(`/profile/${candidateId}`)
  }

  handleChangeDistrict = (year, code) => {
    if (!year || !code) return
    this.props.history.push(`/district/${year}/${code}`)
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
    } = this.props

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

            return (
              <>
                <DCCAOverview
                  year={year}
                  name_zh={district.name_zh}
                  dc_code={district.district.dc_code}
                  dc_name_zh={district.district.dc_name_zh}
                  dc_name_zh={district.district.dc_name_zh}
                  code={district.code}
                  tags={district.tags}
                  voterData={groupVoteStat(district.vote_stats)}
                />
                {/* TODO Refactor style for ToggleMap Button */}
                <UnstyledButton
                  style={{ margin: '8px 0 0 16px', fontSize: '14px' }}
                  onClick={() => this.setState({ showMap: !showMap })}
                >
                  {showMap ? '隱藏地圖' : '顯示地圖'}
                  {showMap ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </UnstyledButton>
                <Collapse in={showMap}>
                  <Box
                    width={{ sm: '100%', md: '960px' }}
                    height={{ sm: '300px', md: '400px' }}
                  >
                    <DCCACompareMap
                      year={year}
                      code={code}
                      changeDistrict={this.handleChangeDistrict}
                    />
                  </Box>
                </Collapse>
                <MainAreas areas={district.main_areas || []} />
                <PlainCard>
                  <Typography variant="h6">現任區議員</Typography>
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
                <CandidateList
                  candidates={district.candidates}
                  // year={parseInt(year, 10)}
                  // code={code}
                  // handleCandidateSelected={this.handleCandidateSelected}
                />
              </>
            )
          }}
        </Query>
      </>
    )
  }
}

export default BattleGroundPage
