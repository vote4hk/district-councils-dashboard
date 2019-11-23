import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { QUERY_GET_CANDIDATES } from 'queries/gql'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { UnstyledNavLink } from 'components/atoms/Link'
import { Tag, SecondaryTag } from 'components/atoms/Tag'
import Rows from 'components/atoms/Rows'
import { SeperatedColumns } from 'components/atoms/Columns'
import { HtmlTooltip } from 'components/atoms/Tooltip'
import { Box, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { fireEvent } from 'utils/ga_fireevent'
import { useTranslation } from 'react-i18next'
import {
  getColorFromCamp,
  getConstituencyTagsByCandidateCamps,
  withLanguage,
  getCurrentLanguage,
} from 'utils/helper'
import { COLORS } from 'ui/theme'
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo'

const IMAGE_HOST_URI =
  process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'

const CandidateList = styled(Grid)`
  && {
  }
`

const CandidateGrid = styled(Grid)`
  && {
    margin-bottom: 8px;
  }
`

const DCCAStatusTagsContainer = styled(SeperatedColumns)`
  && {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
`

const StyledTag = styled(Tag)`
  && {
    margin-left: 8px;
    margin-bottom: 5px;
  }
`

const StyledSecondaryTag = styled(SecondaryTag)`
  && {
    margin-left: 8px;
    margin-bottom: 5px;
  }
`

const Candidate = styled(Box)`
  && {
    position: relative;
    width: auto;
    text-align: center;
    & > div {
      margin: 0 auto;
    }
  }
`

const CandidateNumber = styled(Box)`
  && {
    position: relative;
    margin-bottom: -18px !important;
    top: -19px;
    left: -28px;
    border-radius: 50%;
    font-weight: 700;
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    background-color: ${props => COLORS.camp[props.camp].background};
    color: ${props => COLORS.camp[props.camp].text};
    text-align: center;
  }
`

const ControversialAlert = styled.div`
  && {
    position: relative;
    margin-bottom: -21px !important;
    top: -21px;import { Tag } from 'components/atoms/Tag';

    left: 30px;
  }
`
const CandidateName = styled(Typography)`
  && {
    margin-top: 5px;
    font-weight: 700;
  }
`

const CandidatesContainer = props => {
  const { code, year, election_forum } = props
  const { t } = useTranslation()
  const [imageLoadError, setImageLoadError] = useState(true)

  return (
    <Query
      query={QUERY_GET_CANDIDATES}
      variables={{ code, year }} // variables={{ code, year }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`

        const candidates =
          data.dcd_candidates &&
          data.dcd_candidates.filter(c => c.election_type === 'ordinary')

        const currentLanguage = getCurrentLanguage()

        const tags = getConstituencyTagsByCandidateCamps(candidates)
        return (
          <>
            {candidates.length > 0 && (
              <>
                <Rows>
                  <DCCAStatusTagsContainer>
                    {tags.length > 0 &&
                      tags.map((tag, index) => (
                        <StyledSecondaryTag value={tag} key={index} />
                      ))}
                    {election_forum &&
                      election_forum.map((forum, index) => (
                        <StyledTag
                          icon={<OndemandVideoIcon />}
                          value={t('candidateContainer.election_forum', {
                            n: election_forum.length > 1 ? index + 1 : '',
                          })}
                          handleClick={() => {
                            fireEvent({
                              ca: 'battleground',
                              ac: 'click',
                              lb: 'watch_election_forum',
                            })
                            window.open(forum, '_blank')
                          }}
                        />
                      ))}
                  </DCCAStatusTagsContainer>
                </Rows>
                <Rows>
                  <SeperatedColumns>
                    <CandidateList container direction="row">
                      {/* Max 3 columns and always centered */}
                      {candidates.map(candidate => (
                        <CandidateGrid
                          key={candidate.person.id}
                          item
                          xs={
                            candidates.length < 3 ? 12 / candidates.length : 4
                          }
                          sm={
                            candidates.length < 4 ? 12 / candidates.length : 3
                          }
                          md={
                            candidates.length < 6 ? 12 / candidates.length : 2
                          }
                        >
                          <UnstyledNavLink
                            to={`/${currentLanguage}/profile/${candidate.person
                              .name_zh || candidate.person.name_en}/${
                              candidate.person.uuid
                            }`}
                          >
                            <Candidate>
                              <PeopleAvatar
                                dimension="84px"
                                borderwidth={'4'}
                                camp={getColorFromCamp(candidate.camp)}
                                src={`${IMAGE_HOST_URI}/static/images/avatar/100x100/${candidate.person.uuid}.jpg`}
                                imgProps={{
                                  onError: e => {
                                    // wingkwong: avoid infinite callbacks if fallback image fails
                                    if (imageLoadError) {
                                      setImageLoadError(false)
                                      e.target.src =
                                        IMAGE_HOST_URI +
                                        '/static/images/avatar/default.png'
                                    }
                                  },
                                }}
                                opacity={
                                  candidate.nominate_status === 'disqualified'
                                    ? 0.4
                                    : 1.0
                                }
                              />
                              {candidate.candidate_number > 0 && (
                                <CandidateNumber
                                  dimension="18px"
                                  camp={getColorFromCamp(candidate.camp)}
                                >
                                  {candidate.candidate_number}
                                </CandidateNumber>
                              )}
                              {candidate.tags.findIndex(
                                tag =>
                                  tag.type === 'camp' && tag.tag === '有爭議'
                              ) > -1 && (
                                <ControversialAlert>
                                  <HtmlTooltip
                                    disableFocusListener
                                    disableTouchListener
                                    // text="侯選人政治立場未明"
                                    text={t('candidate.noPoliticalAffiliation')}
                                    placement="bottom"
                                    size={21}
                                  />
                                </ControversialAlert>
                              )}
                              <CandidateName variant="h5">
                                {withLanguage(
                                  candidate.person.name_en,
                                  candidate.person.name_zh ||
                                    candidate.person.name_en
                                )}
                              </CandidateName>

                              <Typography variant="body2">
                                {withLanguage(
                                  candidate.political_affiliation_en,
                                  candidate.political_affiliation_zh
                                ) || t('candidate.noPoliticalAffiliation')}
                              </Typography>

                              {candidate.nominate_status === 'disqualified' && (
                                <Typography variant="body2">
                                  {/* 取消資格 */}
                                  {t(
                                    'candidate.nominateStatus.disqualified_bracket'
                                  )}
                                </Typography>
                              )}
                              {candidate.nominate_status === 'suspended' && (
                                <Typography variant="body2">
                                  {t(
                                    'candidate.nominateStatus.suspended_bracket'
                                  )}
                                </Typography>
                              )}
                              {candidate.tags.findIndex(
                                tag =>
                                  tag.type === 'demo_status' &&
                                  tag.tag === 'planb'
                              ) > -1 && (
                                <Typography variant="body2">
                                  {t(
                                    'candidate.nominateStatus.demo_planb_bracket'
                                  )}
                                </Typography>
                              )}
                            </Candidate>
                          </UnstyledNavLink>
                        </CandidateGrid>
                      ))}
                    </CandidateList>
                  </SeperatedColumns>
                </Rows>
              </>
            )}
          </>
        )
      }}
    </Query>
  )
}

CandidatesContainer.propsType = {
  // cacode: PropTypes.string,
  // year: PropTypes.number,
}
export default CandidatesContainer
