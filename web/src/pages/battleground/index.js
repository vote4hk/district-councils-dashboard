import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import DCCACompareMap from '../../components/DCCACompareMap'
import { Query } from 'react-apollo'
import DistrictCard from 'components/district/DistrictCard'
import MainAreas from 'components/district/MainAreas'
import CandidateList from 'components/district/CandidateList'
import Metrics from 'components/district/Metrics'
import styled from 'styled-components'
import { bps } from 'ui/responsive'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'
import { QUERY_CONSTITUENCIES } from 'queries/gql'

const FullWidthBox = styled(Box)`
  && {
    padding-top: 4rem;
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

const DistrictCardContainer = styled(Box)`
  && {
    padding-left: 30px;
    margin: 0px;
    width: 400px;
    height: 400px;

    ${bps.down('md')} {
      margin: 10px;
      width: 100%;
      padding: 0px;
    }
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
        <FlexRowContainer>
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
          <Query
            query={QUERY_CONSTITUENCIES}
            variables={{ year, lastElectionYear: year - 4, code }}
          >
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`
              const district = data.dcd_constituencies[0]
              const voterData = groupVoteStat(district.vote_stats)
              return (
                <>
                  {/* TODO: */}
                  <Typography>{district.name_zh}</Typography>
                  <Typography>{district.district.dc_name_zh}</Typography>
                  {district.tags.map((tag, index) => (
                    <Typography key={index}>{tag.tag}</Typography>
                  ))}
                  <Typography>
                    New voters: {voterData.aggregations.all_voters}
                  </Typography>
                  <Typography>
                    Increased by:{' '}
                    {(100 * voterData.aggregations.new_voters) /
                      voterData.aggregations.all_voters}
                    %
                  </Typography>

                  <DistrictCardContainer>
                    <DistrictCard
                      {...district}
                      year={parseInt(year, 10)}
                      code={code}
                      onNextElection={this.onNextElection.bind(this)}
                      onPrevElection={this.onPrevElection.bind(this)}
                    />
                  </DistrictCardContainer>
                  <FullWidthBox>
                    <MainAreas areas={district.main_areas || []} />
                  </FullWidthBox>
                  <LowerBackgroundContainer>
                    <FlexRowContainer>
                      <FullWidthBox>
                        <Metrics
                          year={year}
                          code={code}
                          district={district}
                        ></Metrics>
                      </FullWidthBox>
                      <FullWidthBox>
                        <CandidateList
                          candidates={district.candidates}
                          year={parseInt(year, 10)}
                          code={code}
                          handleCandidateSelected={this.handleCandidateSelected}
                        />
                      </FullWidthBox>
                    </FlexRowContainer>
                  </LowerBackgroundContainer>
                </>
              )
            }}
          </Query>
        </FlexRowContainer>
      </>
    )
  }
}

export default BattleGroundPage
