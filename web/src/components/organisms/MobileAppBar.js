import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import ContextStore from 'ContextStore'
import { DRAWER_OPEN } from '../../reducers/drawer'
import { UnstyledNavLink } from '../atoms/Link'
import ShareButton from './ShareButton'
import { fireEvent } from 'utils/ga_fireevent'

const StyledAppBar = styled(AppBar)`
  && {
    background: white;
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
      <StyledAppBar position="sticky">
        <Toolbar disableGutters>
          <AppBarTitle to={'/'}>
            <Typography variant="h1" align="center">
              <span role="img" aria-label="區議會 2019">
                vote4.hk ✋🏻💜⚡
              </span>
            </Typography>
          </AppBarTitle>
          <IconButton
            color="inherit"
            component="span"
            aria-label="Search"
            onClick={() => {
              dispatch({ type: DRAWER_OPEN })
              fireEvent({
                ca: 'general',
                ac: 'click',
                lb: 'menu_drawer',
              })
            }}
          >
            <MenuIcon />
          </IconButton>
          <ShareButton
            onClick={() =>
              fireEvent({
                ca: 'general',
                ac: 'click',
                lb: 'share_button',
              })
            }
          />
        </Toolbar>
      </StyledAppBar>
    </>
  )
}

export default MobileAppBar
