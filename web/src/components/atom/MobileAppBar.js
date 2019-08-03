import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'

const StyledAppBar = styled(AppBar)`
  && {
    width: 100%;
    box-shadow: none;
  }
`

const StyledToolbar = styled(Toolbar)`
  && {
    display: flex;
  }
`

const AppBarTitle = styled(Typography)`
  && {
    flex-grow: 1;
    text-decoration: none;
    text-align: center;
  }
`

const Container = styled(Box)`
  && {
    margin-bottom: 16px;
  }
`

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
))
Transition.displayName = 'Transition'

function MobileAppBar(props) {
  return (
    <>
      <StyledAppBar position="sticky" color="secondary">
        <Container>
          <StyledToolbar disableGutters>
            <IconButton
              color="inherit"
              component="span"
              aria-label="Search"
              onClick={props.onDrawerOpen}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            <AppBarTitle variant="h4">Vote for Hong Kong</AppBarTitle>
            <IconButton
              color="inherit"
              component="span"
              aria-label="Menu"
              onClick={props.onDrawerOpen}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </StyledToolbar>
          <AppBarTitle variant="h2">了解香港議會，投出合適一票</AppBarTitle>
        </Container>
      </StyledAppBar>
    </>
  )
}

export default MobileAppBar
