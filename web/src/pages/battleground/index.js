import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import DCCACompareMap from '../../components/DCCACompareMap'
import { Query } from 'react-apollo'
import MainAreas from 'components/district/MainAreas'
import Councillor from 'components/district/Councillor'
import CouncillorSelection from 'components/district/CouncillorSelection'
import CandidateList from 'components/district/CandidateList'
import DCCAOverview from 'components/district/DCCAOverview'
import styled from 'styled-components'
import { bps } from 'ui/responsive'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import _ from 'lodash'
import { QUERY_CONSTITUENCIES } from 'queries/gql'

const FullWidthBox = styled(Box)`
  && {
    width: 100%;
  }
`

const LowerBackgroundContainer = styled(Box)`
  && {
    width: 100vw;
    position: relative;
    margin-left: -50vw;
    left: 50%;
    background-color: #fafafa;
  }
`

const FlexRowContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    ${bps.up('md')} {
      width: 100%;
    }

    ${bps.up('lg')} {
      width: 1440px;
    }
    margin: auto;
  }
`
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
        <Query
          query={QUERY_CONSTITUENCIES}
          variables={{ year, lastElectionYear: year - 4, code }}
        >
          {({ loading, error, data }) => {
            if (loading) return null
            if (error) return `Error! ${error}`
            const district = data.dcd_constituencies[0]
            const last_district = data.last_dcd_constituencies[0]

            console.log(data)

            return (
              <>
                <DCCAOverview
                  year={year}
                  name_zh={district.name_zh}
                  dc_name_zh={district.district.dc_name_zh}
                  code={district.code}
                  tags={district.tags}
                  voterData={groupVoteStat(district.vote_stats)}
                />
                <Button onClick={() => this.setState({ showMap: !showMap })}>
                  {showMap ? '隱藏地圖' : '顯示地圖'}
                  <ExpandMoreIcon />
                </Button>
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
                {last_district.councilors &&
                last_district.councilors.length === 1 ? (
                  <Councillor councilor={last_district.councilors[0]} />
                ) : (
                  <CouncillorSelection />
                )}
                {/* <LowerBackgroundContainer>
                      <FullWidthBox>
                        <CandidateList
                          candidates={district.candidates}
                          year={parseInt(year, 10)}
                          code={code}
                          handleCandidateSelected={this.handleCandidateSelected}
                        />
                      </FullWidthBox>
                  </LowerBackgroundContainer> */}
              </>
            )
          }}
        </Query>
      </>
    )
  }
}

export default BattleGroundPage
