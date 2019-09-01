import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { PlainCard } from '../molecules/Card'
import { Tag } from '../atoms/Tag'
import { UnstyledNavLink } from '../atoms/UnstyledLink'
import {
  getColorFromPoliticalAffiliation,
  getElectionResults,
} from 'utils/helper'

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    width: 60px;
    height: 60px;
    border: 3px ${props => props.theme.camp[props.camp]} solid;
  }
`
class Councillor extends Component {
  static propTypes = {
    // areas: PropTypes.array.isRequired
  }

  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard'

  render() {
    const { districts } = this.props

    // Filter out small intersect area
    const filteredDistricts = districts.filter(
      district =>
        district.intersect_area === null || district.intersect_area > 1000
    )

    // Reformat the councillor object
    const councillors = filteredDistricts.map(district => {
      const predecessor = district.predecessor
      const electionResults = getElectionResults(
        predecessor.councillors[0].person
      )
      return {
        code: predecessor.code,
        name_zh: predecessor.name_zh,
        person: predecessor.councillors[0].person,
        political_affiliation: predecessor.councillors[0].political_affiliation,
        electionResults,
        lastElectionResult:
          electionResults[electionResults.lastParticipatedYear],
      }
    })

    const tags = ['競逐連任'] //getTagsForPerson(councillor.person)
    return (
      <PlainCard>
        <Typography variant="h6">現任區議員</Typography>
        {filteredDistricts.length > 1 && (
          <Typography variant="h6">{`此區與上屆${filteredDistricts.length}個選區重疊`}</Typography>
        )}
        {councillors.map(councillor => (
          <UnstyledNavLink
            key={councillor.code}
            to={`/profile/${councillor.person.name_zh ||
              councillor.person.name_en}/${councillor.person.uuid}`}
          >
            <Box>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="h6" gutterBottom>
                    2015{' '}
                    {`${
                      councillor.person.councillors.find(
                        c =>
                          c.year ===
                          councillor.electionResults.lastParticipatedYear
                      ).constituency.name_zh
                    }（${
                      councillor.person.councillors.find(
                        c =>
                          c.year ===
                          councillor.electionResults.lastParticipatedYear
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
                    camp={getColorFromPoliticalAffiliation(
                      councillor.political_affiliation
                    )}
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
                        {councillor.electionResults.lastParticipatedYear}
                        選舉結果
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {councillor.lastElectionResult.diff === 0 && '自動當選'}
                        {councillor.lastElectionResult.diff > 0 &&
                          `${
                            councillor.lastElectionResult.diff /
                              councillor.lastElectionResult.votes >
                            0.2
                              ? '大'
                              : councillor.lastElectionResult.diff /
                                  councillor.lastElectionResult.votes <
                                0.05
                              ? '險'
                              : ''
                          }勝${councillor.lastElectionResult.diff}票`}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </UnstyledNavLink>
        ))}
      </PlainCard>
    )
  }
}

export default Councillor
