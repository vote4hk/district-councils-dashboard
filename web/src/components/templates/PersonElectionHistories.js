import React from 'react'
import PropTypes from 'prop-types'
import { PlainCard } from 'components/molecules/Card'
import Typography from '@material-ui/core/Typography'
import { Box, Grid } from '@material-ui/core'
import { SuccessText, FailureText } from '../atoms/Text'

const PersonElectionHistories = props => {
  const { histories } = props

  return (
    <>
      {histories.map((m, index) => (
        <PlainCard key={index}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {m.year}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={4}>
              <Typography variant="h5">{m.constituency.name_zh}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">{`${m.political_affiliation || '-'}（${
                m.camp
              }）`}</Typography>
            </Grid>
            {m.votes > 0 ? (
              <Grid item xs={3}>
                <Typography variant="h5">{`${m.votes}票`}</Typography>
              </Grid>
            ) : (
              <Grid item xs={3}>
                <Typography variant="h5">自動當選</Typography>
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
      ))}
    </>
  )
}

PersonElectionHistories.propsType = {
  histories: PropTypes.array,
}

export default PersonElectionHistories
