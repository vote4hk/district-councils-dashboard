import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import AddressSearcher from 'components/molecules/AddressSearcher'
import PeopleSearcher from 'components/molecules/PeopleSearcher'
import DistrictSelector from 'components/molecules/DistrictSelector'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core/'

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

const StyledExpansionPanelSummary = styled(ExpansionPanelSummary)`
  && {
  }
`

const StyledExpansionPanelDetail = styled(ExpansionPanelDetails)`
  && {
  }
`

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
  }
`

const AddressSearchContainer = styled(Box)`
  && {
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
  }
`

const SearchMenu = props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  const [expanded, setExpanded] = React.useState('panel1')

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  function handleAddressSelected(result) {
    /* TODO: 
      Use context (?) to store the Global district result array
      When user select click previous button in district page, 
      the CACODE should follow follow the above result
    */

    props.history.push(`/district/${result.year}/${result.code}`)
    dispatch({ type: DRAWER_CLOSE })
  }

  function handlePeopleSelected(person) {
    // TODO: move to helper
    const path = `/profile/${person.name_zh || person.name_en}/${person.uuid}`
    props.history.push(path)
    dispatch({ type: DRAWER_CLOSE })
  }

  function goToHomePage() {
    props.history.push('/')
    dispatch({ type: DRAWER_CLOSE })
  }

  function renderSearchDistrict() {
    return (
      <AddressSearchContainer>
        <AddressSearcher handleAddressSelected={handleAddressSelected} />
      </AddressSearchContainer>
    )
  }

  function renderSearchPeople() {
    return (
      <AddressSearchContainer>
        <PeopleSearcher handlePeopleSelected={handlePeopleSelected} />
      </AddressSearchContainer>
    )
  }

  return (
    <>
      <LeftMargin>
        <Typography variant="h6" color="secondary" onClick={goToHomePage}>
          返回首頁
        </Typography>
      </LeftMargin>

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
          <DistrictSelector />
        </StyledExpansionPanelDetail>
      </StyledExpansionPanel>
    </>
  )
}

export default withRouter(SearchMenu)
