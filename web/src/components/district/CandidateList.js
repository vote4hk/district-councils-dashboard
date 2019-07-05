import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CustomizedProgressBars from '../../components/BorderLinearProgress'
import Avatar from '@material-ui/core/Avatar'

const Container = styled.div`
   {
    width: 100%;
    height: 220px;
    padding: 0;
  }
`

class CandidateList extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }

  // todo: use ENV_VAR
  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'

  render() {
    const { candidates, year, code } = this.props
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          議員候選人
        </Typography>
        <Grid item xs={12}>
          {candidates
            .sort((a, b) => a.candidate_number - b.candidate_number)
            .map(candidate => (
              <div style={{ width: '100%' }} key={candidate.candidate_number}>
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
                            this.homeUrl + '/static/images/avatar/default.png'
                        },
                      }}
                    ></Avatar>
                  </Box>
                  <Box p={1}>
                    <Typography gutterBottom variant="h6">
                      {`${
                        candidate.candidate_number == null
                          ? ''
                          : candidate.candidate_number + '.'
                      } ${candidate.person.name_zh ||
                        candidate.person.name_en}`}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography color="textSecondary" variant="body2">
                      陣營
                    </Typography>
                    <Typography gutterBottom variant="body1">
                      {candidate.political_affiliation
                        ? candidate.political_affiliation.name_zh
                        : ''}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography gutterBottom variant="body1">
                      {`${candidate.votes} (${candidate.vote_percentage}%)`}
                    </Typography>
                  </Box>
                  <Box p={1}>
                    <Typography color="textSecondary" variant="body2">
                      得票率
                    </Typography>
                    <CustomizedProgressBars
                      value={parseFloat(candidate.vote_percentage)}
                    />
                  </Box>
                  <Box p={1}>
                    {candidate.is_won && <CheckCircleIcon />}
                    {!candidate.is_won && (
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                        }}
                      ></div>
                    )}
                  </Box>
                </Box>
              </div>
            ))}
        </Grid>
      </Container>
    )
  }
}

export default CandidateList
