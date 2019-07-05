import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const Container = styled(Paper)`
  && {
    width: 400px;
    height: 400px;
    background-color: #f6f6f6;
    padding: 0;
  }
`
const YearText = styled(Typography)`
  && {
    width: 72px;
    height: 41px;
    font-family: Avenir;
    font-size: 30px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #333333;
  }
`

const RegionText = styled(Typography)`
  && {
    font-family: PingFangTC;
    font-size: 40px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #333333;
    display: inline-block;
  }
`

const CodeText = styled(Typography)`
  && {
    padding-left: 10px;
    font-family: Avenir;
    font-size: 30px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #333333;
    display: inline-block;
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
    const { name_zh, name_en, year, code } = this.props
    return (
      <Container>
        <Box border={0} color="primary.minor" p={4}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {this.renderPrevElectionButton(year)}
            <YearText variant="button" gutterBottom>
              {year}
            </YearText>
            {this.renderNextElectionButton(year)}
          </Box>
          <RegionText>{name_zh}</RegionText>
          <CodeText>{code}</CodeText>
          <Divider />
          <List>
            <ListItemText primary={'區議員'} />
            <ListItemSecondaryAction></ListItemSecondaryAction>
          </List>
          <List>
            <ListItemText primary={'政黨'} />
            <ListItemSecondaryAction></ListItemSecondaryAction>
          </List>
        </Box>
      </Container>
    )
  }
}

export default DistrictCard
