import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import { bps } from '../../ui/responsive'
import UnstyledLink from './UnstyledLink'

const StyledAppBar = styled(AppBar)`
  && {
    width: 100%;
    box-shadow: none;
    ${bps.down('sm')} {
      display: none;
    }
  }
`

const AppBarTitle = styled(UnstyledLink)`
  && {
    font-weight: 700;
    text-decoration: none;
    margin-right: 5rem;

    &:hover {
      text-decoration: none;
    }
  }
`

const NavLink = styled(UnstyledLink)`
  && {
    margin: 0 1.5rem -5px;
    border-bottom: 5px solid transparent;

    &:hover {
      border-bottom: 5px solid #ffee4f;
      text-decoration: none;
    }
  }
`

function DesktopAppBar(props) {
  const { navs } = props
  return (
    <>
      <StyledAppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <AppBarTitle component={RouterLink} to="/">
              Vote for Hong Kong
            </AppBarTitle>
            {navs.map((nav, i) => (
              <NavLink key={i} component={RouterLink} to={nav.url}>
                {nav.title}
              </NavLink>
            ))}
          </Toolbar>
        </Container>
      </StyledAppBar>
    </>
  )
}

export default DesktopAppBar
