import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
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
    background-color: white;
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

const AppBarTitle = styled(UnstyledLink)`
  && {
    font-weight: 700;
    flex-grow: 1;
    text-decoration: none;
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
    margin: 0 1.5rem -5px;
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
      <StyledAppBar position="sticky" color="default">
        <Container>
          <StyledToolbar disableGutters>
            <AppBarTitle component={RouterLink} to="/">
              Vote for Hong Kong
            </AppBarTitle>
            <IconButton
              edge="end"
              component="span"
              color="default"
              aria-label="Menu"
              onClick={handleClickOpen}
            >
              <MenuIcon />
            </IconButton>
          </StyledToolbar>
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
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
          >
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
                primary={<NavText variant="h2">{nav.title}</NavText>}
              />
            </ListItemLink>
          ))}
        </NavList>
      </Dialog>
    </>
  )
}

export default MobileAppBar
