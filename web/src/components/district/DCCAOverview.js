import React, { Component } from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { Tag } from '../atom/Tag'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
  }
`

class DCCAOverview extends Component {
  static propTypes = {
    // year: PropTypes.number.isRequired,
    // code: PropTypes.string.isRequired,
    // name_zh: PropTypes.string.isRequired,
    // name_en: PropTypes.string.isRequired,
    // onPrevElection: PropTypes.func.isRequired,
    // onNextElection: PropTypes.func.isRequired,
    // candidates: PropTypes.array.isRequired,
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
    const { name_zh, year, code, dc_name_zh, tags, voterData } = this.props

    const new_voters_percentage = (
      (100 * voterData.aggregations.new_voters) /
      voterData.aggregations.all_voters
    ).toFixed(2)
    return (
      <Container>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h6" gutterBottom>
              {year} {dc_name_zh}
            </Typography>
          </Box>
          <Box>
            {tags.map((tag, index) => (
              <Tag key={index} value={tag.tag} />
            ))}
          </Box>
        </Box>
        <Typography variant="h3" style={{ display: 'inline-block' }}>
          {name_zh}
        </Typography>
        <Typography
          variant="h5"
          style={{ display: 'inline-block', marginLeft: '8px' }}
        >
          {code}
        </Typography>
        <Typography variant="h6">
          選民人數 {voterData.aggregations.all_voters}{' '}
          {`(${
            new_voters_percentage > 0 ? '+' : '-'
          }${new_voters_percentage}%)`}
        </Typography>
      </Container>
    )
  }
}

export default DCCAOverview
