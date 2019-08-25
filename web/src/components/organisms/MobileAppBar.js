import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Slide from '@material-ui/core/Slide'
import { DRAWER_OPEN } from '../../reducers/drawer'
import ContextStore from 'ContextStore'
import { UnstyledNavLink } from '../atoms/UnstyledLink'

const StyledAppBar = styled(AppBar)`
  && {
    width: 100%;
    box-shadow: none;
  }
`

const AppBarTitle = styled(UnstyledNavLink)`
  && {
    left: auto;
    right: auto;
    width: 100%;
    position: absolute;
  }
`

function MobileAppBar(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  return (
    <>
      <StyledAppBar position="sticky" color="primary">
        <Toolbar disableGutters>
          <AppBarTitle to={'/'}>
            <Typography variant="h3" align="center">
              ✋🧡⚡
            </Typography>
          </AppBarTitle>

          <IconButton
            color="inherit"
            component="span"
            aria-label="Search"
            onClick={() => dispatch({ type: DRAWER_OPEN })}
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
    </>
  )
}

export default MobileAppBar
