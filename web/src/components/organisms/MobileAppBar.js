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

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
    justify-content: space-between;
  }
`

const AppBarTitle = styled(UnstyledNavLink)`
  && {
    text-decoration: none;
    text-align: center;
  }
`

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
))
Transition.displayName = 'Transition'

function MobileAppBar(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  return (
    <>
      <StyledAppBar position="sticky" color="primary">
        <StyledToolbar disableGutters>
          <IconButton
            color="inherit"
            component="span"
            aria-label="Search"
            onClick={() => dispatch({ type: DRAWER_OPEN })}
          >
            <SearchIcon />
          </IconButton>

          <AppBarTitle to={'/'}>
            <Typography variant="h3">✋🧡⚡</Typography>
          </AppBarTitle>
          <IconButton
            color="inherit"
            component="span"
            aria-label="Menu"
            onClick={() => dispatch({ type: DRAWER_OPEN })}
          >
            <MenuIcon />
          </IconButton>
        </StyledToolbar>
      </StyledAppBar>
    </>
  )
}

export default MobileAppBar
