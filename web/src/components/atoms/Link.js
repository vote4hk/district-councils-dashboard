import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { COLORS } from 'ui/theme'

export const UnstyledLink = styled(Link)`
  text-decoration: unset;
  color: unset;
  font-style: unset;
  cursor: pointer;
`

export const UnstyledNavLink = styled(NavLink)`
  text-decoration: unset;
  color: unset;
  font-style: unset;
  cursor: pointer;
`
export const DefaultLink = styled(UnstyledLink)`
  color: ${COLORS.main.primary};
  font-weight: 500;
`