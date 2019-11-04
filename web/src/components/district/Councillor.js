import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { PlainCard } from '../molecules/Card'
import { Tag } from '../atoms/Tag'
import { UnstyledNavLink } from '../atoms/Link'
import { COLORS } from 'ui/theme'
import { useTranslation } from 'react-i18next'
import {
  getColorFromPoliticalAffiliation,
  getElectionResults,
} from 'utils/helper'
import moment from 'moment'

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    width: 60px;
    height: 60px;
    border: 3px ${props => COLORS.camp[props.camp].background} solid;
  }
`

// TODO: refactor this component with a container
// the logic here is too messy
class Councillor extends Component {
  static propTypes = {
    // areas: PropTypes.array.isRequired
  }

  render() {
    const { districts } = this.props
    const homeUrl = process.env.REACT_APP_HOST_URI

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

    const isWithinTerm = ({ term_from, term_to }, year) => {
      return moment(year, 'YYYY')
        .add(1, 'year')
        .add(1, 'day')
        .isBetween(moment(term_from), moment(term_to))
    }

    const tags = [] // ['競逐連任'] //getTagsForPerson(councillor.person)
    const { t } = useTranslation()

    return (
      <PlainCard>
        <Typography variant="h6">
          {/* 現任區議員 */}
          {t('currentTerm.councilor')}
        </Typography>
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
                    {`${councillor.electionResults.lastParticipatedYear} `}
                    {`${
                      councillor.person.councillors.find(c =>
                        isWithinTerm(
                          c,
                          councillor.electionResults.lastParticipatedYear
                        )
                      ).constituency.name_zh
                    }（${
                      councillor.person.councillors.find(c =>
                        isWithinTerm(
                          c,
                          councillor.electionResults.lastParticipatedYear
                        )
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
                    src={`${homeUrl}/static/images/avatar/${councillor.person.uuid}.jpg`}
                    imgProps={{
                      onError: e => {
                        e.target.src =
                          homeUrl + '/static/images/avatar/default.png'
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
                      <Typography variant="body2">
                        {/* 報稱政治聯繫 */}
                        {t('reportedPoliticalAffiliation')}
                      </Typography>
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
                        {/* 選舉結果 */}
                        {t('electionResults')}
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
