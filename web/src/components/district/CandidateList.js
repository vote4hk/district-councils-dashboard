import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { PlainCard } from '../molecules/Card'

const Container = styled.div`
   {
    padding: 16px;
  }
`

class CandidateList extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }

  // todo: use ENV_VAR
  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'

  render() {
    const { candidates } = this.props

    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          候選人
        </Typography>
        <Typography variant="body1">
          2019年區議會提名期為10月2日至15日，稍後會更新潛在候選人
        </Typography>
      </Container>
    )
  }
}

export default CandidateList
