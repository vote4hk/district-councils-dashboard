import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import UnstyledLink from './UnstyledLink'
import { bps } from '../../utils/responsive'

const StyledAppBar = styled(AppBar)`
  && {
    width: 100%;
    box-shadow: none;
    ${bps.up('md')} {
      display: none;
    }
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

const StyledListItem = styled(ListItem)`
  && {
    padding: 1rem 1rem;
  }
`

function ListItemLink(props) {
  return <StyledListItem button component={UnstyledLink} {...props} />
}

const NavList = styled(List)`
  && {
    padding: 0 1rem;
  }
`

const NavText = styled(Typography)`
  && {
    display: inline;
    font-weight: 700;
    margin: 0 1.5rem 0;
    border-bottom: 5px solid #ffee4f;

    &:hover {
      text-decoration: none;
    }
  }
`

function MobileAppBar(props) {
  const [open, setOpen] = React.useState(false)
  const { navs } = props

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <StyledAppBar position="sticky" color="secondary">
        <Container>
          <StyledToolbar disableGutters>
            <IconButton
              color="inherit"
              component="span"
              aria-label="Search"
              onClick={handleClickOpen}
            >
              <SearchIcon fontSize="small" />
            </IconButton>
            <AppBarTitle variant="h4">Vote for Hong Kong</AppBarTitle>
            <IconButton
              color="inherit"
              component="span"
              aria-label="Menu"
              onClick={handleClickOpen}
            >
              <MenuIcon fontSize="small" />
            </IconButton>
          </StyledToolbar>
          <AppBarTitle variant="h2">了解香港議會，投出合適一票</AppBarTitle>
        </Container>
      </StyledAppBar>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <div style={{ flexGrow: 1 }} />
          <IconButton edge="end" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <NavList>
          {navs.map((nav, i) => (
            <ListItemLink
              key={i}
              component={RouterLink}
              to={nav.url}
              onClick={handleClose}
            >
              <ListItemText
                primary={
                  <NavText variant="h2" color="textSecondary">
                    {nav.title}
                  </NavText>
                }
              />
            </ListItemLink>
          ))}
        </NavList>
      </Dialog>
    </>
  )
}

export default MobileAppBar
