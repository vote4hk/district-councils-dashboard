import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import AddressSearcher from './AddressSearcher'
import DistrictSelector from './DistrictSelector'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'

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

const ContentContainer = styled(Box)`
  && {
    width: 100%;
    justify-content: center;
  }
`

const AddressSearchContainer = styled(Box)`
  && {
    width: 100%;
    padding: 21px 16px 21px 16px;
    background-color: ${props => props.theme.secondaryBackgroundColor};
  }
`

const TabContainer = styled(Box)`
  && {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`

const TabButton = styled(Button)`
  && {
    margin: 10px 10px 0px 10px;
    padding-bottom: 15px;

    color: ${props =>
      props.active === 'active'
        ? props.theme.subtextColor
        : props.theme.main.color};
    border-bottom: ${props =>
      props.active === 'active'
        ? `1px solid ${props.theme.subtextColor}`
        : 'none'};
  }
`

const NavBarButton = styled(IconButton)`
  && {
    position: fixed;
    top: 0px;
    right: 0px;
  }
`

function SearchPage(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)
  const [selectedTab, setSelectedTab] = React.useState(
    props.selectedTab || 'district'
  )

  // async function onAddressFieldChanged(evt) {
  //   const { value } = evt.target
  //   const records = await AddressParser.parse(value)
  //   this.setState({
  //     autoCompleteList: records,
  //   })
  // }

  // function handlePeopleSelected(result) {
  //   props.history.push(`profile/${result.id}`)
  // }

  function handleAddressSelected(result) {
    if (!result) return

    const lastest = result.pop()

    /* TODO: 
      Use context (?) to store the Global district result array
      When user select click previous button in district page, 
      the CACODE should follow follow the above result
    */

    props.history.push(`/district/${lastest.year}/${lastest.CACODE}`)

    props.onDrawerClose()
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
        <DistrictSelector />
      </ContentRowContainer>
    )
  }

  function renderSearchPeople() {
    return (
      <ContentRowContainer>
        <AddressSearchContainer>
          <AddressSearcher handleAddressSelected={handleAddressSelected} />
        </AddressSearchContainer>
        <ContentContainer>
          <DistrictSelector />
        </ContentContainer>
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
      <TabContainer>
        <TabButton
          active={selectedTab === 'district' ? 'active' : 'inactive'}
          onClick={onTabSelected('district')}
        >
          <Typography variant="h3">找選區</Typography>
        </TabButton>
        <TabButton
          active={selectedTab === 'people' ? 'active' : 'inactive'}
          onClick={onTabSelected('people')}
        >
          <Typography variant="h3">找候選人</Typography>
        </TabButton>
      </TabContainer>
      <StyledDivier />
      {selectedTab === 'district'
        ? renderSearchDistrict()
        : renderSearchPeople()}
    </Container>
  )
}

export default withRouter(SearchPage)
