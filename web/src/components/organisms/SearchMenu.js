import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import SearchTab from 'components/organisms/SearchTab'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import { ExpansionPanel } from '@material-ui/core/'

const StyledExpansionPanel = styled(ExpansionPanel)`
  && {
    margin: 0 !important;
    .Mui-expanded {
      margin: 0;
    }
    border: none;
    box-shadow: none;
    ::before {
      display: none;
    }
  }
`
StyledExpansionPanel.muiName = 'ExpansionPanel'

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
      {/*
      <StyledExpansionPanel
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <StyledExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography variant="h6" color="secondary">
            找選區
          </Typography>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetail>
          {renderSearchDistrict()}
        </StyledExpansionPanelDetail>
      </StyledExpansionPanel>
      <StyledExpansionPanel
        square
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <StyledExpansionPanelSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography variant="h6" color="secondary">
            找候選人
          </Typography>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetail>
          {renderSearchPeople()}
        </StyledExpansionPanelDetail>
      </StyledExpansionPanel>
      <StyledExpansionPanel
        square
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <StyledExpansionPanelSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography variant="h6" color="secondary">
            所有選區
          </Typography>
        </StyledExpansionPanelSummary>
        <StyledExpansionPanelDetail>
          {renderDistrictSelector()}
        </StyledExpansionPanelDetail>
      </StyledExpansionPanel>
      */}
    </>
  )
}

export default withRouter(SearchMenu)
