import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PlainCard } from 'components/molecules/Card'
import Typography from '@material-ui/core/Typography'
import { Box, Grid } from '@material-ui/core'
import { SuccessText, FailureText } from '../atoms/Text'
import { UnstyledNavLink } from '../atoms/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { formatNumber, getCurrentLanguage } from 'utils/helper'
import { useTranslation } from 'react-i18next'
import {
  getCentroidFromYearAndCode,
  getAllFeaturesFromPoint,
} from 'utils/features'

const PersonElectionHistoriesTitle = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const createQueryStringToBattlegroundPage = election => {
  const currentLanguage = getCurrentLanguage()
  let targetPath = `/${currentLanguage}/district/2019/${election.constituency.code}`
  switch (election.year) {
    case 2019:
      return targetPath
    case 2015:
    case 2011:
    case 2007:
    case 2003:
      const coordinates = getCentroidFromYearAndCode(
        election.year,
        election.constituency.code
      )
      const point = {
        lng: coordinates[0],
        lat: coordinates[1],
      }
      const dccaHistories = getAllFeaturesFromPoint(point)
      targetPath = `/${currentLanguage}/district/2019/${
        dccaHistories.find(history => history.year === '2019').CACODE
      }`
      return targetPath + `?year=${election.year}`
    default:
      return '#'
  }
}

const PersonElectionHistories = props => {
  const { histories } = props
  const { t } = useTranslation()
  histories.sort((a, b) => {
    if (b.year > a.year) return 1
    else if (b.year < a.year) return -1
    else {
      if (b.election_type === 'ordinary' && a.election_type === 'by-election')
        return 1
      else return -1
    }
  })

  return (
    <>
      {histories.map((m, index) => (
        <UnstyledNavLink
          key={index}
          to={createQueryStringToBattlegroundPage(m)}
        >
          <PlainCard color="#fafafa">
            <PersonElectionHistoriesTitle>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {m.year}
                </Typography>
              </Box>
              <Box>
                {createQueryStringToBattlegroundPage(m) !== '#' && (
                  <NavigateNextIcon />
                )}
              </Box>
            </PersonElectionHistoriesTitle>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h5">{m.constituency.name_zh}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h5">{`${m.political_affiliation || '-'}（${
                  m.camp
                }）`}</Typography>
              </Grid>
              <Grid item xs={3}>
                {m.is_won ? (
                  <SuccessText>
                    {m.votes > 0 ? `${formatNumber(m.votes)}票` : '自動當選'}
                  </SuccessText>
                ) : (
                  <FailureText>
                    {m.votes > 0 && `${formatNumber(m.votes)}票`}
                  </FailureText>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">{m.constituency.code}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6">
                  {/* 報稱政治聯繫 */}
                  {t('reportedPoliticalAffiliation')}
                </Typography>
              </Grid>
              {m.votes > 0 ? (
                <Grid item xs={3}>
                  {m.is_won ? (
                    <SuccessText>
                      {/* 當選 */}
                      {t('election.tag1')}
                    </SuccessText>
                  ) : (
                    <FailureText>
                      {/* 落敗 */}
                      {t('election.tag3')}
                    </FailureText>
                  )}
                </Grid>
              ) : (
                <Grid item xs={3}></Grid>
              )}
            </Grid>
          </PlainCard>
        </UnstyledNavLink>
      ))}
    </>
  )
}

PersonElectionHistories.propsType = {
  histories: PropTypes.array,
}

export default PersonElectionHistories
