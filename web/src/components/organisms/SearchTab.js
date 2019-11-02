import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import SearchAllBox from 'components/organisms/SearchAllBox'
import PeopleSearcher from 'components/molecules/PeopleSearcher'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { COLORS } from 'ui/theme'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import { getProfilePath } from 'utils/helper'
import DistrictSelector from 'components/molecules/DistrictSelector'
import { fireEvent } from 'utils/ga_fireevent'
import { useTranslation } from 'react-i18next'

const Container = styled(Paper)`
  && {
    width: 100%;
    box-shadow: none;
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
    padding: 21px 0px;
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
      props.active === 'active' ? COLORS.main.primary : COLORS.main.text};
    border-bottom: ${props =>
      props.active === 'active' ? `1px solid ${COLORS.main.primary}` : 'none'};
    border-radius: 0px;
  }
`

function SearchTab(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)
  const [selectedTab, setSelectedTab] = React.useState(
    props.selectedTab || 'district'
  )
  const { t } = useTranslation()

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
    const path = getProfilePath(person)
    props.history.push(path)
    dispatch({ type: DRAWER_CLOSE })
  }

  function onTabSelected(tab) {
    return () => {
      fireEvent({
        ca: 'search',
        ac: 'click',
        lb: `by_${tab}`,
      })
      setSelectedTab(tab)
    }
  }

  function renderSearchDistrict() {
    return (
      <ContentRowContainer>
        <DistrictSelector expanded={false} />
        <AddressSearchContainer>
          <SearchAllBox handleAddressSelected={handleAddressSelected} />
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
          <Typography variant="h3">
            {/* 找選區 */}
            {t('searchTab.text1')}
          </Typography>
        </TabButton>
        <TabButton
          active={selectedTab === 'people' ? 'active' : 'inactive'}
          onClick={onTabSelected('people')}
        >
          <Typography variant="h3">
            {/* 找候選人 */}
            {t('searchTab.text2')}
          </Typography>
        </TabButton>
      </TabContainer>
      {selectedTab === 'district'
        ? renderSearchDistrict()
        : renderSearchPeople()}
    </Container>
  )
}

export default withRouter(SearchTab)
