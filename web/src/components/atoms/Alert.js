import styled from 'styled-components'
import Columns from 'components/atoms/Columns'
import { COLORS } from 'ui/theme'

export const Alert = styled(Columns)`
  && {
    width: 100%;
    padding: 4px 16px 1px;
    background-color: ${COLORS.main.primary};
    color: ${COLORS.main.background};
  }
`
