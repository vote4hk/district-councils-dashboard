import React from 'react'
import styled from 'styled-components'
import HexMap from 'components/charts/HexMap'

const Container = styled.div`
  && {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`
const HexMapContainer = props => {
  return (
    <Container>
      <HexMap onHexClick={props.onHexClick} />
    </Container>
  )
}
export default HexMapContainer
