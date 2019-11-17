import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import SearchAllBox from 'components/organisms/SearchAllBox'
import Paper from '@material-ui/core/Paper'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import DistrictSelector from 'components/molecules/DistrictSelector'
import { getCurrentLanguage } from 'utils/helper'

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
    padding: 8px 0px 8px;
  }
`

function SearchTab(props) {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  function handleAddressSelected(result) {
    /* TODO:
      Use context (?) to store the Global district result array
      When user select click previous button in district page,
      the CACODE should follow follow the above result
    */
    const currentLanguage = getCurrentLanguage()
    props.history.push(
      `/${currentLanguage}/district/${result.year}/${result.code}`
    )
    dispatch({ type: DRAWER_CLOSE })
  }

  return (
    <Container>
      <ContentRowContainer>
        <DistrictSelector expanded={false} />
        <AddressSearchContainer>
          <SearchAllBox handleAddressSelected={handleAddressSelected} />
        </AddressSearchContainer>
      </ContentRowContainer>
    </Container>
  )
}

export default withRouter(SearchTab)
