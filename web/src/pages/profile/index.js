import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import styled, { css } from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { bps } from 'utils/responsive'

// TODO: add age, camp & political_affiliation
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
    margin-left: 50px;
    ${bps.up('sm')} {
      margin-left: 0px;
      margin-right: 50px;
    }
  }
`

const ElectionHistoryContainer = styled(FlexRowContainer)`
  && {
    padding: 20px;
    background-color: #fafafa;
    ${bps.up('sm')} {
      padding-left: 40px;
    }

    ${bps.up('md')} {
      padding-left: 120px;
      height: 100%;
    }
  }
`
const ElectionHistoryHeader = styled.div`
  && {
    ${commonFontStyle}
    font-size: 32px;
    font-weight: 600;
    color: #333333;
    margin-top: 60px;
  }
`

const YearDiv = styled.div`
  && {
    font-size: 24px;
    font-weight: 600;
    color: #9b9b9b;
    margin-bottom: 20px;
  }
`

const ElectionHistoryPaper = styled(Paper)`
  && {
    padding: 20px;
  }
`

const ElectionHistoryContentGrid = styled(Grid)`
  && {
    padding: 15px;
  }
`

const ElectionHistoryContentSpan = styled(Grid)`
  && {
    ${commonFontStyle}
    font-size: 18px;
    color: #4a4a4a;
  }
`

const ElectionHistoryContentHeaderSpan = styled(ElectionHistoryContentSpan)`
  && {
    font-weight: 500;
  }
`
const ElectionDetailButton = styled.div`
  && {
    ${commonFontStyle}
    padding: 15px;
    font-weight: 600;
    color: #ffb700;
    width: 100%;
    text-align: center;
    border-radius: 4px;
    border: 2px solid #ffb700;
    cursor: pointer;
  }
`

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  handleElectionDetailButton = () => {
    //TODO
  }

  renderElectionInfoCard(election, yob) {
    console.log(election)
    return (
      <Grid item xs={12} md={4}>
        <YearDiv>{`${election.year}年`}</YearDiv>
        <ElectionHistoryPaper>
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionHistoryContentHeaderSpan item xs={12} md={4}>
              年齡
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {yob && election.year ? `${election.year - yob}歲` : '-'}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <hr />
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionHistoryContentHeaderSpan item xs={12} md={4}>
              地區
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {' '}
              {election.constituency && election.constituency.name
                ? election.constituency.name
                : '-'}{' '}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <hr />
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionHistoryContentHeaderSpan item xs={12} md={4}>
              選區
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {election.political_affiliation
                ? election.political_affiliation.name_zh
                : '-'}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <hr />
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionHistoryContentHeaderSpan item xs={12} md={4}>
              陣營
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {election.camp ? election.camp : '-'}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <hr />
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionHistoryContentHeaderSpan item xs={12} md={4}>
              選舉結果
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {' '}
              {`${election.votes} ( ${election.vote_percentage}% )`}{' '}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionDetailButton
              onClick={() => {
                this.handleElectionDetailButton()
              }}
            >
              查看選舉資料
            </ElectionDetailButton>
          </ElectionHistoryContentGrid>
        </ElectionHistoryPaper>
      </Grid>
    )
  }

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
              {/* TODO: use grid instead */}
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
                      {person.elections[person.elections.length - 1].occupation
                        ? person.elections[person.elections.length - 1]
                            .occupation
                        : '-'}
                    </ContentColumn>
                    <ContentColumn>TODO</ContentColumn>
                    <ContentColumn>TODO</ContentColumn>
                  </BasicInfoBox>
                </BasicInfoGridBox>
              </BasicInfoContainer>
              <ElectionHistoryContainer>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ElectionHistoryHeader>區議會選舉</ElectionHistoryHeader>
                  </Grid>

                  {person.elections.map(election =>
                    this.renderElectionInfoCard(election, person.estimated_yob)
                  )}
                </Grid>
              </ElectionHistoryContainer>
            </>
          )
        }}
      </Query>
    )
  }
}

export default ProfilePage
