import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import OLMap from '../../components/OLMap'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import DistrictCard from 'components/district/DistrictCard'
import MainAreas from 'components/district/MainAreas'
import CandidateList from 'components/district/CandidateList'
import styled from 'styled-components'
import { bps } from 'utils/responsive'

const GET_DISTRICTS = gql`
  query($year: Int!, $code: String!, $legacyYear: String!) {
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
          name_zh
          name_en
        }
        vote_percentage
        votes
        is_won
      }
    }
    dc_people_legacy(
      where: { year: { _eq: $legacyYear }, cacode: { _eq: $code } }
    ) {
      camp
      name_chi
    }
  }
`

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

class DistrictPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    //  if (this.props.route.path === nextProps.route.path) return false;
    return true
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
        params: { year, code },
      },
    } = this.props

    // TODO: wrong type in dc_people_legacy. should change it in schema instead of using an extra variable. String -> Int
    const legacyYear = year.toString()
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
          <Query query={GET_DISTRICTS} variables={{ year, code, legacyYear }}>
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`
              const district = data.dc_constituencies[0]
              console.log(data)
              const legacy = data.dc_people_legacy
              return (
                <>
                  <Box
                    p={0}
                    paddingLeft="30px"
                    width={{ sm: '100%', md: '400px' }}
                    height={{ sm: '300px', md: '400px' }}
                  >
                    <DistrictCard
                      {...district}
                      year={parseInt(year, 10)}
                      code={code}
                      onNextElection={this.onNextElection.bind(this)}
                      onPrevElection={this.onPrevElection.bind(this)}
                    />
                  </Box>
                  <FullWidthBox>
                    <MainAreas areas={district.main_areas || []} />
                  </FullWidthBox>
                  <LowerBackgroundContainer>
                    <FlexRowContainer>
                      <FullWidthBox>
                        <Typography variant="h5" gutterBottom>
                          估計人口
                        </Typography>
                        {district.expected_population}
                      </FullWidthBox>
                      <FullWidthBox>
                        <CandidateList
                          candidates={district.candidates}
                          year={parseInt(year, 10)}
                          code={code}
                          legacy={legacy}
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

export default DistrictPage
