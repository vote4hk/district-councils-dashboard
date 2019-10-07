import React, { Component } from 'react'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { PeopleAvatar } from 'components/atoms/Avatar'
import ScrollableTabs from 'components/organisms/ScrollableTabs'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { getColorFromCamp } from 'utils/helper'
import CouncillorMeetingAttendanceContainer from 'components/containers/CouncillorMeetingAttendanceContainer'
import PersonElectionHistoriesContainer from 'components/containers/PersonElectionHistoriesContainer'
import FCPersonData from 'components/templates/FCPersonData'
import { SuccessText, FailureText } from 'components/atoms/Text'
import { COLORS } from 'ui/theme'

// TODO: add age, camp & related_organization
const GET_PEOPLE_PROFILE = gql`
  query($uuid: uuid!) {
    dcd_people(where: { uuid: { _eq: $uuid } }) {
      id
      uuid
      fc_uuid
      name_zh
      name_en
      gender
      related_organization
      estimated_yob
      councillors {
        year
        cacode
        term_from
        term_to
        career
        district {
          dc_name_zh
        }
        political_affiliation
        post
        constituency {
          id
          year
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

const FlexRowContainer = styled(Box)`
  && {
    width: 100%;
  }
`

const CandidateHeaderContainer = styled(FlexRowContainer)`
  && {
    height: 116px;
    position: relative;
    display: flex;
    background: linear-gradient(
      ${props => COLORS.camp[props.camp].background} 84px,
      rgba(255, 255, 255, 0) 32px
    );
  }
`

const CandidateAvatorContainer = styled(Box)`
  && {
    position: absolute;
    left: 16px;
    bottom: 8px;
  }
`

const PersonName = styled.div`
  && {
    position: absolute;
    left: 116px;
    top: 32px;
    color: ${props => COLORS.camp[props.camp].text};
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

const PersonHighlightContainer = styled(FlexRowContainer)`
  && {
    padding: 16px;
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
                election.is_won ? (
                  <SuccessText>當選</SuccessText>
                ) : (
                  <FailureText>落敗</FailureText>
                )
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
        params: { uuid },
      },
    } = this.props

    const homeUrl = process.env.REACT_APP_HOST_URI

    return (
      <Query query={GET_PEOPLE_PROFILE} variables={{ uuid }}>
        {({ loading, error, data }) => {
          if (loading) return null
          if (error) return `Error! ${error}`
          const person = data.dcd_people[0]

          const currentTerm =
            person.councillors &&
            person.councillors[person.councillors.length - 1]
          const lastElection =
            person.candidates && person.candidates[person.candidates.length - 1]

          const personHighlight = []

          if (person.estimated_yob) {
            personHighlight.push({
              xs: 2,
              title: '年齡',
              text: `${2019 - person.estimated_yob}歲`,
            })
          }

          personHighlight.push({
            xs: 5,
            title: '相關組織',
            text: person.related_organization || '-',
          })

          personHighlight.push({
            xs: 5,
            title: '職業',
            text:
              (currentTerm && currentTerm.career) || lastElection.occupation,
          })

          const titles = ['參選紀錄']

          if (person.fc_uuid) titles.push('個人立場')
          titles.push('會議出席率')

          return (
            <>
              <CandidateHeaderContainer
                camp={getColorFromCamp(lastElection && lastElection.camp)}
              >
                <CandidateAvatorContainer>
                  <PeopleAvatar
                    dimension={'84px'}
                    borderwidth={'0'}
                    src={`${homeUrl}/static/images/avatar/${person.uuid}.jpg`}
                    imgProps={{
                      onError: e => {
                        e.target.src = `${homeUrl}/static/images/avatar/default.png`
                      },
                    }}
                  />
                </CandidateAvatorContainer>
                <Box>
                  <PersonName
                    camp={getColorFromCamp(lastElection && lastElection.camp)}
                  >
                    <Typography variant="h3" style={{ marginBottom: '2px' }}>
                      {person.name_zh || ''}
                    </Typography>
                    <Typography variant="h5" style={{ marginBottom: '8px' }}>
                      {person.name_en || ''}
                    </Typography>
                    {currentTerm &&
                      currentTerm.term_to &&
                      Date.parse(new Date()) <
                        Date.parse(currentTerm.term_to) && (
                        <Typography
                          variant="h6"
                          color="secondary"
                        >{`現任${currentTerm.district.dc_name_zh}區議員（${currentTerm.constituency.name_zh}）`}</Typography>
                      )}
                  </PersonName>
                </Box>
              </CandidateHeaderContainer>

              <PersonHighlightContainer>
                <Grid container>
                  {personHighlight.map((highlight, index) => (
                    <Grid item key={index} xs={highlight.xs} pr={1}>
                      <Typography variant="h5">{highlight.text}</Typography>
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  {personHighlight.map((highlight, index) => (
                    <Grid item key={index} xs={highlight.xs} pr={1}>
                      <Typography variant="h6">{highlight.title}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </PersonHighlightContainer>
              <ScrollableTabs
                titles={titles}
                indicatorcolor={
                  COLORS.camp[
                    getColorFromCamp(lastElection && lastElection.camp)
                  ].background
                }
              >
                <PersonElectionHistoriesContainer personId={person.id} />
                {person.fc_uuid && (
                  <FCPersonData
                    fcUuid={person.fc_uuid}
                    name={person.name_zh || person.name_en}
                  />
                )}
                <CouncillorMeetingAttendanceContainer personId={person.id} />
              </ScrollableTabs>
            </>
          )
        }}
      </Query>
    )
  }
}

export default ProfilePage
