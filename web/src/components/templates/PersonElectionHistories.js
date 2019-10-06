import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PlainCard } from 'components/molecules/Card'
import Typography from '@material-ui/core/Typography'
import { Box, Grid } from '@material-ui/core'
import { SuccessText, FailureText } from '../atoms/Text'
import { UnstyledNavLink } from '../atoms/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const PersonElectionHistoriesTitle = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const PersonElectionHistories = props => {
  const { histories } = props

  return (
    <>
      {histories.map((m, index) => (
        <UnstyledNavLink
          key={index}
          to={m.year === 2019 && `/district/2019/${m.constituency.code}`}
        >
          <PlainCard color="#fafafa">
            <PersonElectionHistoriesTitle>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {m.year}
                </Typography>
              </Box>
              <Box>{m.year === 2019 && <NavigateNextIcon />}</Box>
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
              {m.votes > 0 && (
                <Grid item xs={3}>
                  {m.is_won ? (
                    <SuccessText>
                      {m.votes > 0 ? `${m.votes}票` : '自動當選'}
                    </SuccessText>
                  ) : (
                    <FailureText>{`${m.votes}票`}</FailureText>
                  )}
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography variant="h6">{m.constituency.code}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h6">報稱政治聯繫</Typography>
              </Grid>
              {m.votes > 0 ? (
                <Grid item xs={3}>
                  {m.is_won ? (
                    <SuccessText>當選</SuccessText>
                  ) : (
                    <FailureText>落敗</FailureText>
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
