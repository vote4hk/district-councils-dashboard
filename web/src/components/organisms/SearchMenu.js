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
    padding: 0 16px 0 16px;
    cursor: pointer;
  }
`
const SearchMenu = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  function goToPage(route) {
    props.history.push(route)
    dispatch({ type: DRAWER_CLOSE })
  }

  return (
    <>
      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage('/')}
        >
          返回首頁
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage('/district/2019')}
        >
          全港選區一覽
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage('/about-dc')}
        >
          關於區議會選舉
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage('/about-us')}
        >
          我們是誰？
        </Typography>
      </LeftMargin>
      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() =>
            (window.location.href =
              'https://docs.google.com/forms/u/1/d/e/1FAIpQLSdXtbdry3w8hkmZuN0MJaj2CP2X3RUUnCTWLnOujsfx1pHDrw/viewform?usp=send_form')
          }
        >
          反映意見
        </Typography>
      </LeftMargin>
      <LeftMargin>
        <SearchTab />
      </LeftMargin>
    </>
  )
}

export default withRouter(SearchMenu)
