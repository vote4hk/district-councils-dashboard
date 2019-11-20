import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import MapIcon from '@material-ui/icons/Map'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { withLanguage } from 'utils/helper'
import { COLORS } from 'ui/theme'

const Container = styled.div`
   {
    padding: 16px;
  }
`

const VoteStationContainer = styled(Box)`
  && {
    padding: 4px 8px 4px;
    margin-bottom: 8px;
    svg {
      fill: ${COLORS.main.primary};
    }
  }
`
const VoteStation = styled(Grid)`
  && {
    align-items: center;
  }
`

const VoteStationName = styled(Typography)`
  && {
    font-size: 16px;
    font-weight: 600;
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
          <VoteStationContainer key={index}>
            <VoteStation container spacing={1}>
              <Grid item xs={11}>
                <Typography variant="body2">
                  <Box>{station.station_code}</Box>
                </Typography>
                <VoteStationName>
                  {withLanguage(station.name_en, station.name_zh)}
                </VoteStationName>
                <Typography variant="body2">
                  {withLanguage(station.address_en, station.address_zh)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <MapIcon
                  onClick={() => {
                    window.open(
                      `https://maps.google.com/?q=${
                        station.location.coordinates[1]
                      },${station.location.coordinates[0]}`,
                      '_blank'
                    )
                  }}
                />
              </Grid>
            </VoteStation>
          </VoteStationContainer>
        ))}
        {reminder}
      </Container>
    )
  }
}

export default withTranslation()(VoteStations)
