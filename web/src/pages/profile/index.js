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
        occupation
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

const BasicInfoContainer = styled(FlexRowContainer)`
  && {
    margin-top: 20px;
    background-color: #ffffff;
    ${bps.up('md')} {
      height: 245px;
    }
  }
`

const BasicInfoHeader = styled.div`
  && {
    ${commonFontStyle}
    font-size: 32px;
    font-weight: 600;
    width: 100%;
    ${bps.up('sm')} {
      margin-top: 40px;
      margin-left: 60px;
      width: inherit;
    }

    ${bps.up('md')} {
      margin-left: 120px;
    }
  }
`

const commonFlexStyle = css`
   {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 20px 0px;
  }
`

const SubHeaderFlexColumn = styled(Box)`
  && {
    ${commonFontStyle}
    ${commonFlexStyle}
    font-weight: 600;
    color: #4a4a4a;
    font-size: 18px;
    width: 120px;
  }
`

const ContentColumn = styled(Box)`
  && {
    ${commonFontStyle}
    ${commonFlexStyle}
    color: #4a4a4a;
    font-size: 18px;
    ${bps.down('sm')} {
      width: 100%;
    }
  }
`
const BasicInfoHeaderBox = styled(Box)`
  && {
    width: 100%;

    ${bps.up('sm')} {
      width: 250px;
      height: 200px;
    }

    ${bps.up('md')} {
      width: 300px;
    }
  }
`
const BasicInfoBox = styled(Box)`
  && {
    ${bps.up('sm')} {
      margin-top: 25px;
      margin-left: 50px;
    }
  }
`

const BasicInfoGridBox = styled(Box)`
  && {
    display: inline-flex;
    margin-left: 50px ${bps.up('sm')} {
      margin-left: 0px;
      margin-right: 50px;
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
              <BasicInfoContainer>
                <BasicInfoHeaderBox>
                  <BasicInfoHeader>基本資料</BasicInfoHeader>
                </BasicInfoHeaderBox>
                <BasicInfoGridBox>
                  <BasicInfoBox>
                    <SubHeaderFlexColumn>性別</SubHeaderFlexColumn>
                    <SubHeaderFlexColumn>年齡</SubHeaderFlexColumn>
                    <SubHeaderFlexColumn>出生年份</SubHeaderFlexColumn>
                  </BasicInfoBox>
                  <BasicInfoBox>
                    <ContentColumn>
                      {person.gender
                        ? person.gender == 'male'
                          ? '男'
                          : '女'
                        : '-'}
                    </ContentColumn>
                    <ContentColumn>
                      {person.estimated_yob
                        ? `${moment().year() - person.estimated_yob}歲`
                        : '-'}
                    </ContentColumn>
                    <ContentColumn>
                      {person.estimated_yob ? person.estimated_yob : '-'}
                    </ContentColumn>
                  </BasicInfoBox>
                </BasicInfoGridBox>

                <BasicInfoGridBox>
                  <BasicInfoBox>
                    <SubHeaderFlexColumn>職業</SubHeaderFlexColumn>
                    <SubHeaderFlexColumn>陣營</SubHeaderFlexColumn>
                    <SubHeaderFlexColumn>所屬政治聯繫</SubHeaderFlexColumn>
                  </BasicInfoBox>
                  <BasicInfoBox>
                    <ContentColumn>
                      {person.elections.occupation
                        ? person.elections.occupation
                        : '-'}
                    </ContentColumn>
                    <ContentColumn>TODO</ContentColumn>
                    <ContentColumn>TODO</ContentColumn>
                  </BasicInfoBox>
                </BasicInfoGridBox>
              </BasicInfoContainer>
              {/* TODO: History */}
            </>
          )
        }}
      </Query>
    )
  }
}

export default ProfilePage
