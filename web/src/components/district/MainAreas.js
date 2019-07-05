import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const Container = styled.div`
   {
    width: 100%;
    height: 220px;
    padding: 0;
  }
`

class MainAreas extends Component {
  static propTypes = {
    areas: PropTypes.array.isRequired,
  }

  render() {
    const { areas } = this.props
    return (
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          主要屋邨 / 地區
        </Typography>
        <Box display="flex" flexWrap="wrap" alignContent="flex-start">
          {areas.map((area, index) => (
            <Box mr={1} key={index}>
              {`${Object.keys(area)[0]}. ${area[Object.keys(area)[0]]}`}
            </Box>
          ))}
        </Box>
      </Container>
    )
  }
}

export default MainAreas
