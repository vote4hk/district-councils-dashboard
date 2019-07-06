import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import styled, { css } from 'styled-components'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CustomizedProgressBars from '../../components/BorderLinearProgress'
import Avatar from '@material-ui/core/Avatar'
import { bps } from 'utils/responsive'

const commonFontStyle = css`
  font-family: 'PingFangTC-Medium';
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
    padding: 0px 15px 100px 25px;
  }
`

const RowsContainer = styled.div`
   {
    margin-top: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    ${bps.down('md')} {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`

const FlexRowContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 1440px;
    margin: auto;
    ${bps.down('md')} {
      width: 1440px;
      margin: auto;
    }
  }
`

const FlexColumn = styled(Box)`
  && {
    height: 149px;
    align-items: center;
    display: flex;
    padding-left: 40px;
    ${bps.down('md')} {
      height: 70px;
    }
  }
`

const AvatarColumn = styled(FlexColumn)`
  && {
    width: 100px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const NameColumn = styled(FlexColumn)`
  && {
    width: 200px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const PoliticalColumn = styled(FlexColumn)`
  && {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 160px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const StyledDivier = styled(Divider)`
  && {
    margin-left: 30px;
    margin-right: 30px;
  }
`
const CandidateListTitle = styled.div`
   {
    ${commonFontStyle}
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
    font-weight: 600;
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
        <CandidateListTitle>議員候選人</CandidateListTitle>
        <RowsContainer>
          {candidates
            .sort((a, b) => a.candidate_number - b.candidate_number)
            .map((candidate, index) => (
              <>
                {index > 0 ? <StyledDivier /> : null}
                <FlexRowContainer
                  style={{ width: '100%' }}
                  key={candidate.candidate_number}
                >
                  <AvatarColumn>
                    <Avatar
                      src={`${
                        this.homeUrl
                      }/static/images/avatar/${year}/${code}_${
                        year === 2011 ? '0' : ''
                      }${candidate.candidate_number}.jpg`}
                      imgProps={{
                        onError: e => {
                          e.target.src =
                            this.homeUrl + '/static/images/avatar/default.png'
                        },
                      }}
                      style={{
                        width: '66px',
                        height: '88px',
                        borderRadius: 0,
                      }}
                    ></Avatar>
                  </AvatarColumn>
                  <NameColumn p={1}>
                    <CandidateName>
                      {`${
                        candidate.candidate_number == null
                          ? ''
                          : candidate.candidate_number + '.'
                      } ${candidate.person.name_zh ||
                        candidate.person.name_en}`}
                    </CandidateName>
                  </NameColumn>
                  <PoliticalColumn>
                    <ContentHeader>陣營</ContentHeader>
                    {'\n'}
                    <Content>
                      {candidate.political_affiliation
                        ? candidate.political_affiliation.name_zh
                        : ''}
                    </Content>
                  </PoliticalColumn>
                  <PoliticalColumn>
                    <ContentHeader>政治聯繫</ContentHeader>
                    {'\n'}
                    <Content>
                      {// TODO: Refactor
                      legacy.filter(
                        o => o.name_chi == candidate.person.name_zh
                      )[0]
                        ? legacy.filter(
                            o => o.name_chi == candidate.person.name_zh
                          )[0].camp
                        : '-'}
                    </Content>
                  </PoliticalColumn>
                  <PoliticalColumn>
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
                  </PoliticalColumn>
                  <FlexColumn>
                    <ContentHeader>得票率</ContentHeader>
                    <CustomizedProgressBars
                      value={parseFloat(candidate.vote_percentage)}
                    />
                  </FlexColumn>
                  <FlexColumn>
                    {candidate.is_won && <OvalButton />}
                    {!candidate.is_won && (
                      <div
                        style={{
                          width: '95px',
                          height: '95px',
                        }}
                      ></div>
                    )}
                  </FlexColumn>
                </FlexRowContainer>
              </>
            ))}
        </RowsContainer>
      </Container>
    )
  }
}

export default CandidateList
