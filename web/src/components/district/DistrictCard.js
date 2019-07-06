import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { bps } from 'utils/responsive'

const Container = styled(Paper)`
  && {
    width: 400px;
    height: 400px;
    background-color: #f6f6f6;
    padding: 0;

    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const InnerContainer = styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    padding-left: 32px;
    padding-right: 32px;
  }
`

const YearText = styled(Typography)`
  && {
    font-family: Avenir;
    font-size: 30px;
    font-weight: 900;
    color: #333333;
  }
`

const RegionText = styled(Typography)`
  && {
    width: 100%;
    font-family: PingFangTC-Medium;
    font-size: 20px;
    font-weight: 500;
    color: #ffb700;
  }
`

const CodeText = styled(Typography)`
  && {
    margin-left: 10px;
    font-family: PingFangTC-Light;
    font-size: 40px;
    font-weight: 300;
    color: #9b9b9b;
  }
`

const StyledDivier = styled(Divider)`
  && {
    margin-top: 40px;
    background-color: #cecece;
    width: 100%;
  }
`

const SeperatedRow = styled(Box)`
  && {
    margin-top: 20px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

function getCouncillor(candidates) {
  const councillor = {
    name: '',
    politicalAffiliation: '',
  }

  const electedCandidate = candidates.find(candidate => candidate.is_won)
  if (electedCandidate) {
    councillor.name =
      electedCandidate.person.name_zh || electedCandidate.person.name_en
    if (electedCandidate.person.political_affiliations.length) {
      const political_affiliation =
        electedCandidate.person.political_affiliations[0].political_affiliation
      councillor.political_affiliation = political_affiliation.name_zh
    }
  }

  return councillor
}

class DistrictCard extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name_zh: PropTypes.string.isRequired,
    name_en: PropTypes.string.isRequired,
    onPrevElection: PropTypes.func.isRequired,
    onNextElection: PropTypes.func.isRequired,
    candidates: PropTypes.array.isRequired,
  }

  renderPrevElectionButton(year) {
    return year > 1999 ? (
      <IconButton aria-label="arrow_back" onClick={this.props.onPrevElection}>
        <ArrowBackIcon />
      </IconButton>
    ) : (
      // if there is no next button, show a 48x48 empty box to align the 2 elements on the right
      <div style={{ width: '48px', height: '48px' }}></div>
    )
  }

  renderNextElectionButton(year) {
    const nextElectionYear = year + 4
    const currentYear = new Date().getFullYear()
    return nextElectionYear <= currentYear ? (
      <IconButton
        aria-label="arrow_forward"
        onClick={this.props.onNextElection}
      >
        <ArrowForwardIcon />
      </IconButton>
    ) : (
      // if there is no next button, show a 48x48 empty box to align the 2 elements on the left
      <div style={{ width: '48px', height: '48px' }}></div>
    )
  }

  render() {
    const { name_zh, year, code, candidates } = this.props
    const councillor = getCouncillor(candidates)
    return (
      <Container>
        <InnerContainer border={0} color="primary.minor">
          <SeperatedRow>
            {this.renderPrevElectionButton(year)}
            <YearText variant="button" gutterBottom>
              {year}
            </YearText>
            {this.renderNextElectionButton(year)}
          </SeperatedRow>
          <RegionText>--區</RegionText>
          <Typography variant="h3">{name_zh}</Typography>
          <CodeText>{code}</CodeText>
          <StyledDivier />
          <SeperatedRow>
            <Typography variant="h6">區議員</Typography>
            <Typography>{councillor.name}</Typography>
          </SeperatedRow>
          <SeperatedRow>
            <Typography variant="h6">政治聯繫</Typography>
            <Typography>{councillor.political_affiliation}</Typography>
          </SeperatedRow>
          <SeperatedRow>
            <Typography variant="h6">投票站</Typography>
            <Typography variant="subtitle2">-</Typography>
          </SeperatedRow>
        </InnerContainer>
      </Container>
    )
  }
}

export default DistrictCard
