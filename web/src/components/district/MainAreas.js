import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
   {
    padding: 16px;
  }
`

class MainAreas extends Component {
  static propTypes = {
    areas: PropTypes.array.isRequired,
  }

  render() {
    const { areas } = this.props
    const { t } = useTranslation()
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          {/* 主要屋邨 / 地區 */}
          {t('mainAreas.text1')}
        </Typography>
        <Box display="flex" flexWrap="wrap" alignContent="flex-start">
          {areas.map((area, index) => (
            <Box mr={1} key={index}>
              <Typography variant="body1">
                {`${Object.keys(area)[0]} ${area[Object.keys(area)[0]]}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    )
  }
}

export default MainAreas
