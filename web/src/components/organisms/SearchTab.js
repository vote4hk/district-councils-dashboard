import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import AddressSearcher from 'components/molecules/AddressSearcher'
import PeopleSearcher from 'components/molecules/PeopleSearcher'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { COLORS } from 'ui/theme'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import DistrictSelector from 'components/molecules/DistrictSelector'

const Container = styled(Paper)`
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
    margin: 10px 10px 15px 10px;
    padding-bottom: 15px;

    color: ${props =>
      props.active === 'active'
        ? COLORS.main.highlightedText
        : COLORS.main.text};
    border-bottom: ${props =>
      props.active === 'active'
        ? `1px solid ${COLORS.main.highlightedText}`
        : 'none'};
  }
`

function SearchTab(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)
  const [selectedTab, setSelectedTab] = React.useState(
    props.selectedTab || 'district'
  )
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
        <DistrictSelector />
        <AddressSearchContainer>
          <AddressSearcher handleAddressSelected={handleAddressSelected} />
        </AddressSearchContainer>
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
      {selectedTab === 'district'
        ? renderSearchDistrict()
        : renderSearchPeople()}
    </Container>
  )
}

export default withRouter(SearchTab)
