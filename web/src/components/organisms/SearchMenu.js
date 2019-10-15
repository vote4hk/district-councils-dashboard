import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import SearchTab from 'components/organisms/SearchTab'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'

const ExpandedRow = styled(Box)`
  && {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }
`

const LeftMargin = styled(ExpandedRow)`
  && {
    min-height: 48px;
    align-items: center;
    padding: 0 24px 0 24px;
    cursor: pointer;
  }
`
const SearchMenu = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  function goToHomePage() {
    props.history.push('/')
    dispatch({ type: DRAWER_CLOSE })
  }

  return (
    <>
      <LeftMargin>
        <Typography variant="h6" color="secondary" onClick={goToHomePage}>
          返回首頁
        </Typography>
      </LeftMargin>

      <SearchTab />
    </>
  )
}

export default withRouter(SearchMenu)
