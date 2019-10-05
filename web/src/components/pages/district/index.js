import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import OLMap from '../../OLMap'
import { Query } from 'react-apollo'
import DistrictCard from 'components/district/DistrictCard'
import MainAreas from 'components/district/MainAreas'
import Metrics from 'components/district/Metrics'
import styled from 'styled-components'
import { bps } from 'ui/responsive'

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

class DistrictPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    //  if (this.props.route.path === nextProps.route.path) return false;
    return true
  }

  handleCandidateSelected = person => {
    this.props.history.push(
      `/profile/${person.name_zh || person.name_en}/${person.uuid}`
    )
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
          <Query query={QUERY_CONSTITUENCIES} variables={{ year, code }}>
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`
              const district = data.dcd_constituencies[0]
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
                          year={parseInt(year, 10)}
                          code={code}
                          district={district}
                        ></Metrics>
                      </FullWidthBox>
                      <FullWidthBox></FullWidthBox>
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
