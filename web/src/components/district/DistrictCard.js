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
import { bps } from 'ui/responsive'
import { SeperatedColumns } from 'components/atoms/Columns'
import { useTranslation } from 'react-i18next'

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

class DistrictCard extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
    name_zh: PropTypes.string.isRequired,
    name_en: PropTypes.string.isRequired,
    onPrevElection: PropTypes.func.isRequired,
    onNextElection: PropTypes.func.isRequired,
    councillors: PropTypes.array.isRequired,
    district: PropTypes.object.isRequired,
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
    const { name_zh, year, code, councillors, district, stations } = this.props
    const councillor = councillors.length > 0 ? councillors[0] : {}
    const { t } = useTranslation()
    return (
      <Container>
        <InnerContainer border={0} color="primary.minor">
          <SeperatedColumns>
            {this.renderPrevElectionButton(year)}
            <YearText variant="button" gutterBottom>
              {year}
            </YearText>
            {this.renderNextElectionButton(year)}
          </SeperatedColumns>
          <RegionText>{district.dc_name_zh}</RegionText>
          <Typography variant="h3">{name_zh}</Typography>
          <CodeText>{code}</CodeText>
          <StyledDivier />
          <SeperatedColumns>
            <Typography variant="h6">
              {/* 區議員 */}
              {/* TODO: i18n - check councilors or councilor */}
              {t('councilor')}
            </Typography>
            <Typography>
              {councillor.person ? councillor.person.name_zh : '-'}
            </Typography>
          </SeperatedColumns>
          <SeperatedColumns>
            <Typography variant="h6">
              {/* 政治聯繫 */}
              {t('politicalAffiliation')}
            </Typography>
            <Typography>{councillor.political_affiliation || '-'}</Typography>
          </SeperatedColumns>
          <SeperatedColumns>
            <Typography variant="h6">
              {/* 投票站 */}
              {t('districtCard.text2')}
            </Typography>
            {stations.map((station, index) => (
              <Typography key={index} variant="subtitle2">
                {station.name_zh}
              </Typography>
            ))}
          </SeperatedColumns>
        </InnerContainer>
      </Container>
    )
  }
}

export default DistrictCard
