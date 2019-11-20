import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MapIcon from '@material-ui/icons/Map'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { withLanguage } from 'utils/helper'

const Container = styled.div`
   {
    padding: 16px;
  }
`

class VoteStations extends Component {
  static propTypes = {
    stations: PropTypes.array.isRequired,
  }

  render() {
    const { stations, t } = this.props
    let reminder
    if (stations.length > 1) {
      reminder = (
        <Typography variant="body2" gutterBottom>
          {withLanguage(
            'Please confirm your allocated polling station before voting',
            '請於投票前確認閣下獲編配之票站'
          )}
        </Typography>
      )
    }
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          {/* 主要屋邨 / 地區 */}

          {withLanguage('Polling stations', '投票站')}
        </Typography>
        {/* <Box display="flex" flexWrap="wrap" alignContent="flex-start"> */}

        {stations.map((station, index) => (
          <Box
            marginY="8px"
            display="flex"
            flexWrap="wrap"
            alignContent="flex-start"
            bgcolor="WhiteSmoke"
          >
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={11}>
                <Typography variant="h5">
                  <Box fontWeight="fontWeightBold">
                    {station.station_code}{' '}
                    {withLanguage(station.name_en, station.name_zh)}
                  </Box>
                </Typography>
                <Typography variant="body1">
                  {withLanguage(station.address_en, station.address_zh)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <a
                  href={
                    'https://www.elections.gov.hk/dc2019/pdf/polling/' +
                    station.station_code +
                    '_2019_M1.pdf'
                  }
                >
                  <MapIcon />
                </a>
              </Grid>
            </Grid>
          </Box>
        ))}
        {reminder}
      </Container>
    )
  }
}

export default withTranslation()(VoteStations)
