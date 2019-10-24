import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { COLORS } from 'ui/theme'

export const PeopleAvatar = styled(Avatar)`
  && {
    opacity: ${props => props.opacity};
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    border: ${props => props.borderwidth}px
      ${props => props.camp && COLORS.camp[props.camp].background} solid;
  }
`
