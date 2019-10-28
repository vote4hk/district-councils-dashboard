import styled from 'styled-components'
import Box from '@material-ui/core/Box'

export default styled(Box)`
  && {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 100%;
    margin: auto;
  }
`

export const SeperatedColumns = styled(Box)`
  && {
    margin-top: 20px;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`
