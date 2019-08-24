import DistrictNewVoterChartContainer from 'components/DistrictNewVoterChartContainer'
import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'

const FlexRowContainer = styled(Box)`
  && {
    width: 100%;
  }
`

export default props => {
  return (
    <>
      <FlexRowContainer>
        <DistrictNewVoterChartContainer code={'A01'} />
      </FlexRowContainer>
    </>
  )
}
