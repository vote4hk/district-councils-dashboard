import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar'
import { COLORS } from 'ui/theme'

export const PeopleAvatar = styled(Avatar)`
  && {
    width: ${props => props.dimension};
    height: ${props => props.dimension};
    border: ${props => props.borderwidth}px ${props => COLORS.camp[props.camp]}
      solid;
  }
`
