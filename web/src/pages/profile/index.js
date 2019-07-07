import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import styled, { css } from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import moment from 'moment'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { bps } from 'utils/responsive'

const GET_PEOPLE_PROFILE = gql`
  query($id: uuid!) {
    dc_people(
      where: { id: { _eq: $id } }
      order_by: { elections_aggregate: { max: { year: asc } } }
    ) {
      name_en
      name_zh
      estimated_yob
      gender
      elections {
        cacode
        year
        votes
        vote_percentage
        constituency {
          name_zh
          expected_population
          deviation_percentage
        }
      }
    }
  }
`

const commonFontStyle = css`
  font-family: 'PingFangTC-Light';
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
`

const CandidateName = styled.div`
   {
    ${commonFontStyle}
    margin: 20px;
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    ${bps.up('sm')} {
      margin: 0px;
      margin-top: 50px;
      font-size: 30px;
    }

    ${bps.up('md')} {
      margin-top: 50px;
      font-size: 48px;
    }
  }
`

const DistrictName = styled.div`
   {
    ${commonFontStyle}
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    ${bps.up('sm')} {
      font-size: 20px;
    }

    ${bps.up('md')} {
      font-size: 36px;
    }
  }
`

const FlexRowContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    opacity: 0.95;
    background-color: #f6416e;
    ${bps.up('md')} {
      width: 100%;
    }

    ${bps.up('lg')} {
      width: 1440px;
    }
    margin: auto;
  }
`

const CandidateAvatar = styled(Avatar)`
  && {
    width: 153px;
    height: 180px;
    border-radius: 0;

    ${bps.up('sm')} {
      margin-top: 40px;
      margin-left: 60px;
    }

    ${bps.up('md')} {
      margin-left: 120px;
    }
  }
`

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props
    return (
      <Query query={GET_PEOPLE_PROFILE} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`
          const person = data.dc_people[0]
          return (
            <>
              <FlexRowContainer>
                <Box
                  width={{ sm: '250px', md: '300px' }}
                  height={{ sm: '200px' }}
                >
                  <CandidateAvatar src="/static/images/avatar/default.png" />
                </Box>
                <Box>
                  <CandidateName>
                    {person.name_zh ? person.name_zh : ''}{' '}
                    {person.name_zh ? person.name_en : ''}
                    <DistrictName>
                      {/* TODO */}
                      沙田區, 水街
                    </DistrictName>
                  </CandidateName>
                </Box>
              </FlexRowContainer>
            </>
          )
        }}
      </Query>
    )
  }
}

export default ProfilePage
