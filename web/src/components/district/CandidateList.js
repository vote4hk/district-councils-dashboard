import React, { Component } from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Container = styled.div`
  && {
    padding: 16px;
  }
`

class CandidateList extends Component {
  render() {
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
