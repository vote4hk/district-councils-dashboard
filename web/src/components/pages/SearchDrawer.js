import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import SearchMenu from 'components/organisms/search-drawer/SearchMenu'

const Container = styled(Box)`
  && {
    width: 100%;
  }
`

const MenuContainer = styled(Box)`
  && {
    margin-top: 48px;
    display: flex;
    width: 100%;
    flex-flow: column;
  }
`

const NavBarButton = styled(IconButton)`
  && {
    position: fixed;
    top: 0px;
    right: 0px;
  }
`

function AppDrawer(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  return (
    <Container>
      <NavBarButton
        color="inherit"
        component="span"
        aria-label="Menu"
        onClick={() => {
          dispatch({ type: DRAWER_CLOSE })
        }}
      >
        <CloseIcon fontSize="small" />
      </NavBarButton>
      <MenuContainer>
        <SearchMenu />
      </MenuContainer>
    </Container>
  )
}

export default withRouter(AppDrawer)
