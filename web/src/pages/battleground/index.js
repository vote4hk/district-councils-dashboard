import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import OLMap from '../../components/OLMap'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DistrictCard from 'components/district/DistrictCard'
import MainAreas from 'components/district/MainAreas'
import CandidateList from 'components/district/CandidateList'
import Metrics from 'components/district/Metrics'
import styled from 'styled-components'
import { bps } from 'utils/responsive'

const GET_DISTRICTS = gql`
  query($year: Int!, $code: String!, $electionYear: date) {
    dc_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
      name_zh
      name_en
      code
      deviation_percentage
      expected_population
      main_areas
      candidates {
        candidate_number
        person {
          id
          name_zh
          name_en
          political_affiliations(
            where: {
              year_from: { _lte: $electionYear }
              year_to: { _gte: $electionYear }
            }
          ) {
            year_to
            year_from
            political_affiliation {
              name_zh
              id
              camp {
                name_zh
              }
            }
          }
        }
        vote_percentage
        votes
        is_won
      }
    }
  }
`

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

class BattleGroundPage extends Component {
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
        params: { year, code },
      },
    } = this.props
    this.props.history.push(`/district/${parseInt(year, 10) - 4}/${code}`)
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
    const {
      match: {
        params: { year = 2019, code },
      },
    } = this.props

    // TODO: this should be the election date
    const electionYear = `${year}-01-01`

    return (
      <>
        <FlexRowContainer>
          <Box
            width={{ sm: '100%', md: '960px' }}
            height={{ sm: '300px', md: '400px' }}
          >
            <OLMap
              year={year}
              code={code}
              changeDistrict={this.handleChangeDistrict}
            />
          </Box>
          <Query query={GET_DISTRICTS} variables={{ year, code, electionYear }}>
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`
              const district = data.dc_constituencies[0]
              return (
                <>
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
