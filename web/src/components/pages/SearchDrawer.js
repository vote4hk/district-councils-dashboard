import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import AddressSearcher from 'components/molecules/AddressSearcher'
import PeopleSearcher from 'components/molecules/PeopleSearcher'
import DistrictSelector from 'components/molecules/DistrictSelector'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
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
    margin: 0;
    .Mui-expanded {
      margin: 0;
    }
    /* border: 1px solid rgba(0, 0, 0, .125); */
    box-shadow: 'none';
    &:not(:last-child) {
      border-bottom: 0;
    }
    &:before {
      display: 'none';
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

const StyledDivier = styled(Divider)`
  && {
    background-color: #ececec;
    width: 100%;
  }
`

const Container = styled(Box)`
  && {
    width: 100%;
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

const ContentRowContainer = styled(ExpandedRow)`
  && {
    flex-flow: column;
  }
`

const AddressSearchContainer = styled(Box)`
  && {
    width: 100%;
    position: relative;
    left: 0;
    right: 0;
    padding: 21px 16px 21px 16px;
    background-color: ${props => props.theme.secondaryBackgroundColor};
  }
`

const ContentContainer = styled(Box)`
  && {
    margin-top: 100px;
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
  const [selectedTab, setSelectedTab] = React.useState(
    props.selectedTab || 'district'
  )

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

  function onTabSelected(tab) {
    return () => {
      setSelectedTab(tab)
    }
  }

  function renderSearchDistrict() {
    return (
      <ContentRowContainer>
        <AddressSearchContainer>
          <AddressSearcher handleAddressSelected={handleAddressSelected} />
        </AddressSearchContainer>
        {/* <DistrictSelector /> */}
      </ContentRowContainer>
    )
  }

  function renderSearchPeople() {
    return (
      <ContentRowContainer>
        <AddressSearchContainer>
          <PeopleSearcher handlePeopleSelected={handlePeopleSelected} />
        </AddressSearchContainer>
      </ContentRowContainer>
    )
  }

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
      <ContentContainer>
        <StyledExpansionPanel
          square
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <StyledExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography variant="h3">找選區</Typography>
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
            <Typography variant="h3">找候選人</Typography>
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
            <Typography>Collapsible Group Item #3</Typography>
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </ExpansionPanelDetails>
        </StyledExpansionPanel>
      </ContentContainer>
      <StyledDivier />
    </Container>
  )
}

export default withRouter(AppDrawer)
