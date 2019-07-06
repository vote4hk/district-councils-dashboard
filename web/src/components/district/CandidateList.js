import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled, { css } from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CustomizedProgressBars from '../../components/BorderLinearProgress'
import Avatar from '@material-ui/core/Avatar'

const commonFontStyle = css`
  font-family: 'PingFangHK-Regular';
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
`

const OvalButton = styled.div`
  width: 95px;
  height: 95px;
  background: url('/static/images/electedIcon.png');
`

const Container = styled.div`
   {
    width: 100%;
    height: 220px;
    padding: 0px 50px;
  }
`
const CardContainer = styled.div`
   {
    padding: 20px;
  }
`

const CandidateListTitle = styled.div`
   {
    ${commonFontStyle}
    font-family: PingFangTC;
    font-size: 32px;
    font-weight: 600;
    color: #333333;
  }
`

const CandidateName = styled.div`
   {
    ${commonFontStyle}
    font-size: 24px;
    font-weight: 500;
    color: #333333;
  }
`

const BlueVoteContainer = styled.div`
   {
    ${commonFontStyle}
    font-size: 18px;
    font-weight: 500;
    color: #306ece;
  }
`

const RedVoteContainer = styled.div`
   {
    ${commonFontStyle}
    font-size: 18px;
    font-weight: 500;
    color: #f6416e;
  }
`

const ContentHeader = styled.div`
   {
    ${commonFontStyle}
    font-size: 18px;
    font-weight: 500;
    color: #4a4a4a;
  }
`

const Content = styled.div`
   {
    ${commonFontStyle}
    font-size: 18px;
    color: #4a4a4a;
  }
`

class CandidateList extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    legacy: PropTypes.array.isRequired,
  }

  // todo: use ENV_VAR
  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'

  render() {
    const { candidates, year, code, legacy } = this.props
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          <CandidateListTitle>議員候選人</CandidateListTitle>
        </Typography>
        <Grid item xs={12}>
          <Card>
            <CardContainer>
              {candidates
                .sort((a, b) => a.candidate_number - b.candidate_number)
                .map(candidate => (
                  <div
                    style={{ width: '100%' }}
                    key={candidate.candidate_number}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                    >
                      <Box p={1}>
                        <Avatar
                          src={`${
                            this.homeUrl
                          }/static/images/avatar/${year}/${code}_${
                            year === 2011 ? '0' : ''
                          }${candidate.candidate_number}.jpg`}
                          imgProps={{
                            onError: e => {
                              e.target.src =
                                this.homeUrl +
                                '/static/images/avatar/default.png'
                            },
                          }}
                          style={{
                            width: '66px',
                            height: '88px',
                            borderRadius: 0,
                          }}
                        ></Avatar>
                      </Box>
                      <Box p={1}>
                        <CandidateName>
                          {`${
                            candidate.candidate_number == null
                              ? ''
                              : candidate.candidate_number + '.'
                          } ${candidate.person.name_zh ||
                            candidate.person.name_en}`}
                        </CandidateName>
                      </Box>
                      <Box p={1}>
                        <ContentHeader>陣營</ContentHeader>
                        <Content>
                          {candidate.political_affiliation
                            ? candidate.political_affiliation.name_zh
                            : ''}
                        </Content>
                      </Box>
                      <Box p={1}>
                        <ContentHeader>政治聯繫</ContentHeader>
                        <Content>
                          {// TODO: Refactor
                          legacy.filter(
                            o => o.name_chi == candidate.person.name_zh
                          )[0]
                            ? legacy.filter(
                                o => o.name_chi == candidate.person.name_zh
                              )[0].camp
                            : ''}
                        </Content>
                      </Box>
                      <Box p={1}>
                        {candidate.is_won && (
                          <BlueVoteContainer>
                            {' '}
                            {`${candidate.votes} (${candidate.vote_percentage}%)`}{' '}
                          </BlueVoteContainer>
                        )}
                        {!candidate.is_won && (
                          <RedVoteContainer>
                            {' '}
                            {`${candidate.votes} (${candidate.vote_percentage}%)`}{' '}
                          </RedVoteContainer>
                        )}
                      </Box>
                      <Box p={1}>
                        <ContentHeader>得票率</ContentHeader>
                        <CustomizedProgressBars
                          value={parseFloat(candidate.vote_percentage)}
                        />
                      </Box>
                      <Box p={1}>
                        {candidate.is_won && <OvalButton />}
                        {!candidate.is_won && (
                          <div
                            style={{
                              width: '95px',
                              height: '95px',
                            }}
                          ></div>
                        )}
                      </Box>
                    </Box>
                  </div>
                ))}
            </CardContainer>
          </Card>
        </Grid>
      </Container>
    )
  }
}

export default CandidateList
