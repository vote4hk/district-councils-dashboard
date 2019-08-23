import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import styled, { css } from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ScrollableTabsButtonAuto from '../../components/molecules/ScollableTabs'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { bps } from 'ui/responsive'

// TODO: add age, camp & political_affiliation
const GET_PEOPLE_PROFILE = gql`
  query($id: Int!) {
    dcd_people(where: { id: { _eq: $id } }) {
      id
      uuid
      name_zh
      name_en
      gender
      estimated_yob
      councilors {
        year
        cacode
        career
        district {
          dc_name_zh
        }
        political_affiliation
        post
        constituency {
          id
          name_zh
        }
      }
      candidates {
        candidate_number
        is_won
        occupation
        political_affiliation
        age
        cacode
        camp
        election_type
        year
      }
    }
  }
`

const DistrictName = styled.div`
   {
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
    width: 100%;
  }
`

const CandidateHeaderContainer = styled(FlexRowContainer)`
  && {
    height: 84px;
    position: relative;
    display: flex;
    background-color: #f6416e;
  }
`

const CandidateAvatar = styled(Avatar)`
  && {
    position: absolute;
    left: 16px;
    bottom: -16px;
    width: 84px;
    height: 84px;
  }
`

const PersonName = styled.div`
   {
    position: absolute;
    left: 116px;
    top: 32px;
    color: white;
  }
`

const BasicInfoHeader = styled.div`
  && {
    font-size: 32px;
    font-weight: 600;
    width: 100%;

    ${bps.up('md')} {
      margin-left: 65px;
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
    font-size: 32px;
    font-weight: 600;
    color: #333333;
    margin-top: 4px;
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

const PersonHighlight = styled.div`
  && {
    margin-top: 24px;
    display: flex;
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

const BasicInfoGridHeader = styled(Grid)`
  && {
    font-weight: 600;
    color: #4a4a4a;
    font-size: 18px;
  }
`

const BasicInfoGridContent = styled(Grid)`
  && {
    color: #4a4a4a;
    font-size: 18px;
  }
`
class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  handleElectionDetailButton = (year, code) => {
    this.props.history.push(`/district/${year}/${code}`)
  }

  renderElectionInfoCard(election, yob) {
    return (
      <Grid item xs={12} md={4}>
        <YearDiv>{`${election.year}年`}</YearDiv>
        <ElectionHistoryPaper>
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
              {`${election.constituency.name_zh} （${election.cacode}）`}
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
              得票率
            </ElectionHistoryContentHeaderSpan>
            <ElectionHistoryContentSpan item xs={12} md={8}>
              {`${election.vote_percentage}% （${
                election.is_won ? '當選' : '落敗'
              }）`}
            </ElectionHistoryContentSpan>
          </ElectionHistoryContentGrid>
          <ElectionHistoryContentGrid container spacing={1}>
            <ElectionDetailButton
              onClick={() => {
                this.handleElectionDetailButton(election.year, election.cacode)
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

    // todo: use ENV_VAR
    const homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'

    return (
      <Query query={GET_PEOPLE_PROFILE} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`
          const person = data.dcd_people[0]

          const currentTerm =
            person.councilors && person.councilors[person.councilors.length - 1]
          const lastElection =
            person.candidates && person.candidates[person.candidates.length - 1]

          const tabs = [
            {
              label: '履歷',
              content: '123',
            },
            {
              label: '立場',
              content: '123',
            },
            {
              label: '利益申報',
              content: '123',
            },
          ]

          const personHighlight = [
            {
              title: '年齡',
              text: `${2019 - person.estimated_yob}歲`,
            },
          ]

          if (lastElection.political_affiliation) {
            personHighlight.push({
              title: '報稱政治聯繫',
              text: `${lastElection.political_affiliation} （${lastElection.camp}）`,
            })
          }

          personHighlight.push({
            title: '職業',
            text:
              (currentTerm && currentTerm.career) || lastElection.occupation,
          })

          console.log(person)

          return (
            <>
              <CandidateHeaderContainer>
                <Box
                  width={{ sm: '250px', md: '300px' }}
                  height={{ sm: '300px' }}
                >
                  <CandidateAvatar
                    src={`${homeUrl}/static/images/avatar/${person.uuid}.jpg`}
                    imgProps={{
                      onError: e => {
                        e.target.src = `${homeUrl}/static/images/avatar/default.png`
                      },
                    }}
                  />
                </Box>
                <Box>
                  <PersonName>
                    <Typography variant="h3" style={{ marginBottom: '2px' }}>
                      {person.name_zh || ''}
                    </Typography>
                    <Typography variant="h5" style={{ marginBottom: '8px' }}>
                      {person.name_en || ''}
                    </Typography>
                    {currentTerm && (
                      <Typography variant="h6">{`現任${currentTerm.district.dc_name_zh}區議員（${currentTerm.constituency.name_zh}）`}</Typography>
                    )}
                    <DistrictName>{/* TODO */}-</DistrictName>
                  </PersonName>
                </Box>
              </CandidateHeaderContainer>

              <PersonHighlight>
                {personHighlight.map((highlight, index) => (
                  <Box key={index} p={2}>
                    <Typography variant="h5">{highlight.text}</Typography>
                    <Typography variant="h6">{highlight.title}</Typography>
                  </Box>
                ))}
              </PersonHighlight>

              <ScrollableTabsButtonAuto />
              {/* <ElectionHistoryContainer>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <ElectionHistoryHeader>區議會選舉</ElectionHistoryHeader>
                  </Grid>

                  {person.elections
                    .sort((a, b) => b.year - a.year)
                    .map(election =>
                      this.renderElectionInfoCard(
                        election,
                        person.estimated_yob
                      )
                    )}
                </Grid>
              </ElectionHistoryContainer> */}
            </>
          )
        }}
      </Query>
    )
  }
}

export default ProfilePage
