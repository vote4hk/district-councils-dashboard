import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { PlainCard } from '../molecules/Card'
import { Tag } from '../atoms/Tag'
import { UnstyledNavLink } from '../atoms/UnstyledLink'
import { getTagsForPerson, getElectionResults } from 'utils/helper'

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    width: 60px;
    height: 60px;
  }
`

class Councillor extends Component {
  static propTypes = {
    // areas: PropTypes.array.isRequired
  }

  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard'

  render() {
    const { councillor } = this.props
    const tags = [] //getTagsForPerson(councillor.person)
    const electionResults = getElectionResults(councillor.person)
    const lastElectionResult =
      electionResults[electionResults.lastParticipatedYear]
    console.log(councillor)
    return (
      <UnstyledNavLink to={`/profile/${councillor.person.id}`}>
        <PlainCard>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h6">現任區議員</Typography>
              <Typography variant="h6" gutterBottom>
                2015{' '}
                {`${
                  councillor.person.councillors.find(
                    c => c.year === electionResults.lastParticipatedYear
                  ).constituency.name_zh
                }（${
                  councillor.person.councillors.find(
                    c => c.year === electionResults.lastParticipatedYear
                  ).constituency.code
                }）`}
              </Typography>
            </Box>
            <Box>
              {tags.length > 0 &&
                tags.map((tag, index) => <Tag value={tag} key={index} />)}
            </Box>
          </Box>

          <Grid container wrap="nowrap" spacing={0}>
            <Grid item>
              <StyledAvatar
                src={`${this.homeUrl}/static/images/avatar/${councillor.person.uuid}.jpg`}
                imgProps={{
                  onError: e => {
                    e.target.src =
                      this.homeUrl + '/static/images/avatar/default.png'
                  },
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {councillor.person.name_zh}
              </Typography>
              <Box display="flex">
                <Box pr={1} alignSelf="flex-end">
                  <Typography variant="body2">報稱政治聯繫</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {councillor.political_affiliation}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex">
                <Box pr={1} alignSelf="flex-end">
                  <Typography variant="body2">
                    {electionResults.lastParticipatedYear}選舉結果
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {lastElectionResult.diff === 0 && '自動當選'}
                    {lastElectionResult.diff > 0 &&
                      `${
                        lastElectionResult.diff / lastElectionResult.votes > 0.2
                          ? '大'
                          : lastElectionResult.diff / lastElectionResult.votes <
                            0.05
                          ? '險'
                          : ''
                      }勝${lastElectionResult.diff}票`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </PlainCard>
      </UnstyledNavLink>
    )
  }
}

export default Councillor
